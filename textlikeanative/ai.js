// Gọi Claude trực tiếp từ trình duyệt bằng API key của người dùng (lưu trên máy họ).
// SDK được đóng gói sẵn trong vendor/ và chỉ tải khi cần.

import { CHARACTERS, CATEGORIES, TONES } from "./content.js";

const MODEL = "claude-opus-5-5";
const SDK_URL = "./vendor/anthropic-sdk-0.131.0.min.mjs";

let cached = { key: null, client: null, Anthropic: null };

async function getClient(apiKey) {
  if (cached.client && cached.key === apiKey) return cached;
  const { default: Anthropic } = await import(SDK_URL);
  cached = { key: apiKey, Anthropic, client: new Anthropic({ apiKey, dangerouslyAllowBrowser: true }) };
  return cached;
}

export class AIError extends Error {}

async function callJSON(apiKey, system, user, schema) {
  const { client, Anthropic } = await getClient(apiKey);
  let res;
  try {
    res = await client.beta.messages.create({
      model: MODEL,
      max_tokens: 8000,
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      output_config: { effort: "low", format: { type: "json_schema", schema } },
      system,
      messages: [{ role: "user", content: user }],
    });
  } catch (e) {
    if (e instanceof Anthropic.AuthenticationError) throw new AIError("API key không hợp lệ. Kiểm tra lại trong ⚙️ Cài đặt.");
    if (e instanceof Anthropic.PermissionDeniedError) throw new AIError("API key không có quyền dùng model này.");
    if (e instanceof Anthropic.RateLimitError) throw new AIError("Gửi quá nhiều yêu cầu. Đợi một chút rồi thử lại.");
    if (e instanceof Anthropic.APIConnectionError) throw new AIError("Không kết nối được tới Claude. Kiểm tra mạng.");
    if (e instanceof Anthropic.APIError) throw new AIError(`Lỗi từ Claude (${e.status ?? "?"}): ${e.message}`);
    throw e;
  }
  if (res.stop_reason === "refusal") throw new AIError("Claude từ chối yêu cầu này. Thử nói cách khác nhé.");
  if (res.stop_reason === "max_tokens") throw new AIError("Câu trả lời bị cắt ngang. Thử lại nhé.");
  const text = res.content.filter((b) => b.type === "text").map((b) => b.text).join("");
  try {
    return JSON.parse(text);
  } catch {
    throw new AIError("Không đọc được câu trả lời của AI. Thử lại nhé.");
  }
}

const str = { type: "string" };
const obj = (properties) => ({ type: "object", additionalProperties: false, required: Object.keys(properties), properties });

const SLANG_ITEM = obj({
  term: str,
  vi: str,
  category: { type: "string", enum: Object.keys(CATEGORIES) },
  formality: { type: "string", enum: ["1", "2", "3"] },
  who: { type: "string", enum: ["z", "y", "a"] },
  example: str,
});

const LEARNER =
  "The learner is a native Vietnamese speaker at an intermediate English level who lives in Southern California (Orange County). " +
  "They are practicing casual American texting English.";

function transcript(history) {
  if (!history.length) return "(no messages yet)";
  return history.map((m) => `${m.from === "me" ? "LEARNER" : CHARACTERS[m.from]?.name ?? m.from}: ${m.text}`).join("\n");
}

// Tin nhắn tiếp theo của (các) nhân vật, kèm giải thích tiếng Việt và gợi ý trả lời.
export async function nextCharacterTurn(apiKey, { chars, topic, history }) {
  const people = chars.map((id) => `- id "${id}": ${CHARACTERS[id].persona}`).join("\n");
  const system =
    `You play one or more characters texting with a language learner in a realistic chat simulator. ${LEARNER}\n\n` +
    `Characters (use these ids in "from"):\n${people}\n\n` +
    `Scenario: ${topic}\n\n` +
    "Write the next 1-3 text bubbles exactly as these real people would text, staying fully in character and in their texting style. " +
    (chars.length > 1 ? "This is a group chat, so different characters may each send a bubble. " : "") +
    "Keep each bubble short, like real texts. Use real Southern California places when natural. React to what the learner just said, add something, and usually ask something back so the learner has a reason to reply. " +
    "If the learner's last message was a goodbye, wrap up warmly.\n\n" +
    "For every bubble also provide: \"vi\": a natural Vietnamese translation (meaning, not word-for-word); \"tone\": one label; " +
    "\"slang\": every slang word, abbreviation, idiom, casual phrase or emoji with a special meaning in that bubble, each with a Vietnamese meaning, category, formality (1 = close friends only, 2 = casual, 3 = fine with coworkers), who uses it (z = mostly Gen Z, y = Gen Z and millennials, a = all ages) and a short example text message. " +
    "Then give exactly 3 suggested learner replies, from safe (level 1) to bolder and more playful (level 3), each a natural text a native speaker would send, with a Vietnamese translation.";
  const schema = obj({
    messages: {
      type: "array",
      items: obj({ from: { type: "string", enum: chars }, text: str, vi: str, tone: { type: "string", enum: Object.keys(TONES) }, slang: { type: "array", items: SLANG_ITEM } }),
    },
    replies: { type: "array", items: obj({ en: str, vi: str, level: { type: "string", enum: ["1", "2", "3"] } }) },
  });
  const user = `Conversation so far:\n${transcript(history)}\n\nWrite the characters' next bubble(s).`;
  return callJSON(apiKey, system, user, schema);
}

// Nhận xét câu trả lời của người học.
export async function feedbackOnReply(apiKey, { chars, history, reply }) {
  const who = chars.map((id) => `${CHARACTERS[id].name} (${CHARACTERS[id].age}, ${CHARACTERS[id].role})`).join(", ");
  const system =
    `You are a friendly texting coach. ${LEARNER} Explanations must be in Vietnamese; English examples stay in English. ` +
    "Judge the learner's reply as a casual text message, not as formal writing: lowercase, dropped subjects, abbreviations and emojis are fine when they fit the relationship. " +
    "Only list real grammar or word-choice mistakes (wrong verb forms, Vietnamese-style phrasing, wrong word). If there are none, return an empty list. " +
    "\"native\": how a native speaker in this relationship would text the same idea. " +
    "\"score\": naturalness from 1 (sounds like a textbook or a translation) to 5 (sounds like a native texter); \"score_why\": short reason in Vietnamese. " +
    "\"react\", \"add\", \"ask\": whether the reply reacts to what they said, adds something new, and asks something back (React → Add → Ask). " +
    "\"flow_tip\": one short Vietnamese tip on keeping the conversation going (or on ending it well, if the chat is wrapping up).";
  const schema = obj({
    grammar: { type: "array", items: obj({ wrong: str, right: str, why: str }) },
    native: str,
    native_vi: str,
    score: { type: "string", enum: ["1", "2", "3", "4", "5"] },
    score_why: str,
    react: { type: "boolean" },
    add: { type: "boolean" },
    ask: { type: "boolean" },
    flow_tip: str,
  });
  const user = `The learner is texting with: ${who}.\n\nConversation so far:\n${transcript(history)}\n\nThe learner's reply to evaluate:\n${reply}`;
  return callJSON(apiKey, system, user, schema);
}

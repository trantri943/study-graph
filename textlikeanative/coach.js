// Phản hồi offline (không cần AI): bắt các lỗi hay gặp của người Việt và kiểm tra React → Add → Ask.

const GRAMMAR = [
  [/\bi am agree\b/i, "I agree", "\"agree\" là động từ, không cần \"am\"."],
  [/\bi (?:very|so) (like|love|want)\b/i, (m, v) => `I really ${v}`, "Tiếng Anh không đặt \"very\" trước động từ. Dùng \"really\"."],
  [/(?<!\b(?:did|does|do|will|would|can|could|should|might|must|may|let|make|help|to|didn't|doesn't|won't|can't)\s)\b(he|she) (go|like|want|need|have|do|come|make|say|work)\b/i, (m, p, v) => `${p} ${v === "have" ? "has" : v === "do" ? "does" : v === "go" ? "goes" : v + "s"}`, "Ngôi thứ ba số ít (he/she) thì động từ thêm -s."],
  [/\bi have (went|ate|saw|did|came|gave|took|drank|wrote)\b/i, (m, v) => `I ${v.toLowerCase()}`, "Kể việc đã xong thì dùng quá khứ đơn: \"I went\". (Nếu dùng \"have\" thì phải là V3: \"I have gone\".)"],
  [/\bdid(?:n't| not)? (went|ate|saw|came|gave|took|bought|got)\b/i, (m, v) => m.replace(v, { went: "go", ate: "eat", saw: "see", came: "come", gave: "give", took: "take", bought: "buy", got: "get" }[v.toLowerCase()]), "Sau \"did\" dùng động từ nguyên mẫu."],
  [/\bmore (better|easier|cheaper|bigger|faster)\b/i, (m, a) => a, "\"better/easier…\" đã là so sánh hơn, không cần \"more\"."],
  [/\bdiscuss about\b/i, "discuss", "\"discuss\" không đi với \"about\"."],
  [/\bconsider about\b/i, "consider", "\"consider\" không đi với \"about\"."],
  [/\bthe last (weekend|week|night|month)\b/i, (m, t) => `last ${t}`, "\"last weekend\" không cần \"the\"."],
  [/\bin the weekend\b/i, "on the weekend", "Người Mỹ nói \"on the weekend\" (hoặc \"this weekend\")."],
  [/\bi'?m boring\b/i, "I'm bored", "\"I'm boring\" = mình là người nhàm chán. Muốn nói \"mình chán\" thì dùng \"I'm bored\"."],
  [/\b(?:go )?play with (?:my |some )?friends\b/i, "hang out with friends", "Người lớn không \"play\" với bạn, mà \"hang out\"."],
  [/\bgo to play\b/i, "go hang out", "Người lớn dùng \"hang out\" thay cho \"play\"."],
  [/\blet'?s go to eat\b/i, "let's go eat", "Người Mỹ nói \"let's go eat\" hoặc \"let's grab food\"."],
  [/\bopen the (light|lights|air ?con|tv|ac)\b/i, (m, t) => `turn on the ${t}`, "Đèn, máy lạnh, TV thì \"turn on\", không phải \"open\"."],
  [/\bsame same\b/i, "same here", "\"same same\" không tự nhiên. Dùng \"same\" hoặc \"same here\"."],
  [/\bvery delicious\b/i, "so good", "Đúng ngữ pháp nhưng cứng. Người Mỹ nói \"so good\"."],
];

const FORMAL = [
  [/\bi am fine,? thank you\b/i, "Câu kiểu sách giáo khoa. Thử: \"good! wbu?\""],
  [/^(dear|hello)\b/i, "Mở đầu \"Dear/Hello\" quá trang trọng khi nhắn tin. Thử: \"hey!\""],
  [/\bplease inform\b|\bi would like to\b|\bkindly\b/i, "Văn công sở, quá trang trọng cho tin nhắn."],
  [/\bi accept your invitation\b/i, "Quá trang trọng. Thử: \"I'm down!\" hoặc \"count me in!\""],
];

const UNCONTRACTED = /\b(i am|you are|it is|that is|do not|does not|did not|i will|can not|cannot|i have not|we are|they are|is not|are not)\b/gi;
const REACT_START = /^(lol|lmao|haha+|omg|oh|ooh|aww?|ahh?|wow|dang|oof|yikes|no way|nice|sweet|yay|yess*|yeah|yep|ok(?:ay)?|ugh|same|wait|damn|bet|for sure|love that|that'?s|sounds|aw|ha|hey|thank|thanks|ty|sorry|congrats|deal)\b/i;
const EMOJI = /\p{Extended_Pictographic}/u;
const QUESTION_START = /\b(wbu|hbu|what|how|when|where|who|which|why|wanna|want to|do you|are you|r u|did you|can you|have you|you down|u down|you free|u free)\b/i;

function words(s) {
  return s.trim().split(/\s+/).filter(Boolean);
}

function overlap(a, b) {
  const A = new Set(words(a.toLowerCase().replace(/[^\p{L}\s']/gu, "")));
  const B = words(b.toLowerCase().replace(/[^\p{L}\s']/gu, ""));
  return B.filter((w) => A.has(w)).length / Math.max(1, Math.max(A.size, B.length));
}

export function offlineFeedback(reply, suggestions = [], isLastTurn = false, lang = "en") {
  if (lang !== "en") return cjkFeedback(reply, suggestions, isLastTurn, lang);
  const text = reply.trim();
  const grammar = [];
  let fixed = text;
  for (const [re, fix, why] of GRAMMAR) {
    const m = text.match(re);
    if (!m) continue;
    const right = typeof fix === "function" ? fix(...m) : fix;
    grammar.push({ wrong: m[0], right, why });
    fixed = fixed.replace(re, right);
  }

  const notes = [];
  for (const [re, why] of FORMAL) if (re.test(text)) notes.push(why);
  const formal = notes.length;
  const unc = fixed.match(UNCONTRACTED) || [];
  if (unc.length) notes.push(`Khi nhắn tin, người Mỹ hay viết tắt: ${[...new Set(unc.map((u) => u.toLowerCase()))].map(contract).join(", ")}.`);

  const n = words(text).length;
  const react = REACT_START.test(text) || EMOJI.test(text);
  const ask = /\?/.test(text) || QUESTION_START.test(text);
  const add = n - (react ? 1 : 0) >= 4;
  const short = n <= 2 && !isLastTurn;
  if (short) notes.push("Tin hơi ngắn, dễ làm câu chuyện dừng lại.");

  let score = 5 - Math.min(2, grammar.length) - Math.min(2, formal) - (unc.length >= 2 ? 1 : 0) - (short ? 2 : 0);
  if (!react && !add && !ask) score -= 1;
  score = Math.max(1, Math.min(5, score));

  const exact = suggestions.find((s) => s.en.trim().toLowerCase() === text.toLowerCase());
  if (exact) score = 5;
  const best = suggestions.slice().sort((a, b) => overlap(text, b.en) - overlap(text, a.en))[0];

  let flowTip;
  if (isLastTurn) flowTip = "Câu chuyện đang kết thúc: một lời chào vui vẻ là đủ, không cần hỏi thêm.";
  else if (!ask) flowTip = "Thêm một câu hỏi ở cuối (wbu? / what time? / you down?) để người kia có lý do trả lời tiếp.";
  else if (!react) flowTip = "Mở đầu bằng một phản ứng ngắn (haha / omg / nice / aww) để nghe tự nhiên và thân thiện hơn.";
  else flowTip = "Tốt lắm! Bạn vừa phản ứng vừa hỏi lại, câu chuyện sẽ tiếp tục.";

  return {
    offline: true,
    grammar,
    native: exact ? text : best ? best.en : fixed,
    native_vi: exact ? exact.vi : best ? best.vi : "",
    fixed: grammar.length ? fixed : null,
    score: String(score),
    score_why: exact ? "Đây là câu gợi ý, rất tự nhiên." : notes.length ? notes.join(" ") : grammar.length ? "Có lỗi ngữ pháp nhỏ, phần còn lại ổn." : "Nghe tự nhiên, hợp phong cách nhắn tin.",
    react, add, ask,
    flow_tip: flowTip,
  };
}

function contract(s) {
  const map = { "i am": "I'm", "you are": "you're", "it is": "it's", "that is": "that's", "do not": "don't", "does not": "doesn't", "did not": "didn't", "i will": "I'll", "can not": "can't", cannot: "can't", "i have not": "I haven't", "we are": "we're", "they are": "they're", "is not": "isn't", "are not": "aren't" };
  return `${s} → ${map[s] ?? s}`;
}

// Tiếng Nhật, Trung, Hàn: không kiểm tra ngữ pháp offline, chỉ xét React → Add → Ask,
// độ giống câu gợi ý và vài lỗi xưng hô hay gặp.
const CJK = {
  ja: {
    react: /^(え|へー|まじ|マジ|うわ|わー|いいね|なるほど|さすが|おー|やった|草|笑|w|ありがとう|あざ|りょ|了解|承知|お疲れ|それな|わかる|すご|ほんと|本当|ごめん|すみません|おめでとう|楽しみ)/,
    ask: /[?？]|(か|の|かな|よね)[。！!]?$|どう|何|いつ|どこ|誰/,
    flags: [[/あなた/, "Gọi \"あなた\" nghe xa cách. Người Nhật thường bỏ chủ ngữ hoặc gọi họ + さん."]],
  },
  zh: {
    react: /^(哈|哇|好|嗯嗯|真的|太|谢谢|收到|牛|666|我去|天|啊|好家伙|绝|恭喜|没事|不好意思|对)/,
    ask: /[?？]|吗|呢|怎么|什么|几|哪|要不要|好不好|行不行|谁/,
    flags: [[/^(嗯|哦|好)[。.!！]?$/, "Chỉ một chữ 嗯 / 哦 / 好 nghe lạnh lùng. Thêm chữ cho mềm: 好的～, 嗯嗯, 好呀!"], [/🙂/, "🙂 trên WeChat thường mang nghĩa mỉa mai."]],
  },
  ko: {
    react: /^(ㅋ|ㅎ|헐|대박|오|와|아|좋|감사|고마|넵|네|진짜|그니까|ㅇㅋ|ㅇㅇ|ㅠ|미안|죄송|축하)/,
    ask: /[?？]|까|나요|어때|뭐|언제|어디|누구|할래|갈래|볼래/,
    flags: [[/당신/, "\"당신\" nghe lạ, có khi thô. Gọi tên + 씨, chức danh + 님, hoặc bỏ chủ ngữ."], [/^ㅋ$/, "Chỉ một chữ ㅋ có thể nghe nhạt, như cười gượng."]],
  },
};

function cjkFeedback(reply, suggestions, isLastTurn, lang) {
  const text = reply.trim();
  const rule = CJK[lang];
  const chars = [...text.replace(/\s/g, "")];
  const exact = suggestions.find((s) => s.en.trim() === text);
  const sim = (a, b) => { const A = new Set([...a]); const B = [...b]; return B.filter((c) => A.has(c)).length / Math.max(1, Math.max(A.size, B.length)); };
  const best = suggestions.slice().sort((a, b) => sim(text, b.en) - sim(text, a.en))[0];

  const notes = rule.flags.filter(([re]) => re.test(text)).map(([, why]) => why);
  const react = rule.react.test(text) || EMOJI.test(text);
  const ask = rule.ask.test(text);
  const add = chars.length >= 8;
  const short = chars.length <= 2 && !isLastTurn;
  if (short) notes.push("Tin hơi ngắn, dễ làm câu chuyện dừng lại.");

  let score = exact ? 5 : 4 - (short ? 2 : 0) - Math.min(1, notes.length - (short ? 1 : 0)) - (!react && !add && !ask ? 1 : 0);
  score = Math.max(1, Math.min(5, score));

  let flowTip;
  if (isLastTurn) flowTip = "Câu chuyện đang kết thúc: một lời chào vui vẻ là đủ.";
  else if (!ask) flowTip = "Thêm một câu hỏi ngắn ở cuối để người kia có lý do trả lời tiếp.";
  else if (!react) flowTip = "Mở đầu bằng một phản ứng ngắn để nghe tự nhiên và thân thiện hơn.";
  else flowTip = "Tốt lắm! Bạn vừa phản ứng vừa hỏi lại, câu chuyện sẽ tiếp tục.";

  return {
    offline: true,
    noGrammar: true,
    grammar: [],
    native: exact ? text : best ? best.en : text,
    native_reading: exact ? exact.r : best ? best.r : "",
    native_vi: exact ? exact.vi : best ? best.vi : "",
    fixed: null,
    score: String(score),
    score_why: exact ? "Đây là câu gợi ý, rất tự nhiên." : notes.length ? notes.join(" ") : "Không thấy lỗi xưng hô hay gặp. Điểm offline chỉ là ước lượng.",
    react, add, ask,
    flow_tip: flowTip,
  };
}

// Nội dung tĩnh: nhân vật, kịch bản chat, từ điển slang, bài học.

export const TONES = {
  friendly: { vi: "thân thiện", emoji: "😊" },
  teasing: { vi: "chọc ghẹo", emoji: "😜" },
  flirty: { vi: "tán tỉnh", emoji: "😘" },
  sarcastic: { vi: "mỉa mai", emoji: "🙄" },
  serious: { vi: "nghiêm túc", emoji: "😐" },
  pushy: { vi: "nài ép", emoji: "👉" },
};

export const CATEGORIES = {
  abbr: { vi: "Viết tắt", en: "Abbreviations" },
  slang: { vi: "Slang Gen Z", en: "Gen Z slang" },
  react: { vi: "Phản ứng", en: "Reactions" },
  banter: { vi: "Đối đáp chọc ghẹo", en: "Banter comebacks" },
  decline: { vi: "Từ chối lịch sự", en: "Polite declines" },
  phrase: { vi: "Cụm từ thường ngày", en: "Casual phrases" },
  emoji: { vi: "Emoji", en: "Emoji" },
};

export const FORMALITY = {
  1: "Rất suồng sã: chỉ dùng với bạn thân",
  2: "Thân mật: bạn bè, người quen",
  3: "Trung tính: dùng được với đồng nghiệp",
};

export const WHO = {
  z: "Chủ yếu Gen Z (dưới ~27 tuổi)",
  y: "Gen Z & Millennials (dưới ~40 tuổi)",
  a: "Mọi lứa tuổi",
};

export const CHARACTERS = {
  mia: {
    name: "Mia", avatar: "🎓", color: "#F472B6", age: 20,
    role: "Sinh viên UC Irvine · Gen Z",
    style: "Viết thường, nhiều slang và emoji, kéo dài chữ (sooo, yesss)",
    persona: "Mia, 20, a college student at UC Irvine. Gen Z texting style: all lowercase, heavy slang (lowkey, no cap, bet, fr, ngl, it's giving), lots of emojis (😭 💀 🫶 👀), stretched words (sooo, yesss, heyyy), sends 1-3 short bubbles at a time. Bubbly, warm, loves boba, thrifting and the beach.",
  },
  derek: {
    name: "Derek", avatar: "💼", color: "#4F8CFF", age: 34,
    role: "Đồng nghiệp",
    style: "Nửa thân mật, viết tắt nhẹ (btw, fyi), viết hoa đầu câu",
    persona: "Derek, 34, the learner's coworker at an office in Irvine. Semi-casual texting: normal capitalization, light abbreviations (btw, fyi, lol), a 👍 or 😅 sometimes. Friendly dad of two, commutes on the 405, likes coffee and fantasy football.",
  },
  sam: {
    name: "Sam", avatar: "🏡", color: "#FB923C", age: 27,
    role: "Hàng xóm mới",
    style: "Thân thiện, hay chọc ghẹo, đối đáp nhanh",
    persona: "Sam, 27, the learner's new neighbor in Garden Grove. Friendly banter and playful teasing, mostly lowercase, some slang (bro, lol, lowkey), loves pickleball and trying new food. Teases but is never mean.",
  },
  linda: {
    name: "Linda", avatar: "🌻", color: "#818CF8", age: 64,
    role: "Hàng xóm lớn tuổi",
    style: "Viết câu đầy đủ, đúng chính tả, rất ít viết tắt",
    persona: "Linda, 64, a retired teacher who lives next door. Writes full, correctly punctuated sentences, rarely abbreviates, calls people 'dear', uses an occasional 😊. Warm, a bit chatty, loves baking and her grandkids.",
  },
};

// Từ điển: [từ, nhóm, nghĩa tiếng Việt, ví dụ tin nhắn, độ trang trọng 1-3, người dùng z|y|a]
const LEX = [
  ["lol", "abbr", "cười to (laugh out loud). Giờ thường chỉ như 'haha', làm câu nhẹ nhàng hơn", "that's so random lol", 2, "a"],
  ["lmao", "abbr", "cười bò, mạnh hơn lol (laughing my ass off)", "LMAOO i can't 💀", 1, "y"],
  ["tbh", "abbr", "nói thật thì (to be honest)", "tbh i liked the first one better", 2, "y"],
  ["rn", "abbr", "ngay bây giờ (right now)", "i'm so tired rn", 2, "y"],
  ["wbu", "abbr", "còn bạn thì sao? (what about you)", "i'm good! wbu?", 2, "y"],
  ["hbu", "abbr", "còn bạn thế nào? (how about you)", "just chilling at home hbu", 2, "y"],
  ["idk", "abbr", "không biết nữa (I don't know)", "idk what to eat tonight", 2, "a"],
  ["ngl", "abbr", "nói thật nha (not gonna lie)", "ngl that movie was kinda boring", 1, "z"],
  ["omw", "abbr", "đang trên đường tới (on my way)", "omw! be there in 10", 2, "a"],
  ["btw", "abbr", "à mà, nhân tiện (by the way)", "btw I saw your mom at Costco", 3, "a"],
  ["brb", "abbr", "đợi xíu, quay lại liền (be right back)", "brb grabbing food", 2, "y"],
  ["ttyl", "abbr", "nói chuyện sau nhé (talk to you later)", "gotta go, ttyl!", 2, "y"],
  ["nvm", "abbr", "thôi bỏ đi, không có gì (never mind)", "nvm I found it", 2, "a"],
  ["ty", "abbr", "cảm ơn (thank you)", "ty for the ride!", 2, "a"],
  ["np", "abbr", "không có gì (no problem)", "np! happy to help", 2, "a"],
  ["fr", "abbr", "thật đó, thật luôn (for real)", "this place is good fr", 1, "z"],
  ["smh", "abbr", "lắc đầu ngán ngẩm (shaking my head)", "he forgot again smh", 1, "y"],
  ["jk", "abbr", "đùa thôi (just kidding)", "ur the worst jk 😂", 2, "a"],
  ["ikr", "abbr", "đúng không! chuẩn luôn (I know, right?)", "ikr it's so hot today", 1, "y"],
  ["wyd", "abbr", "đang làm gì đó? (what you doing)", "hey wyd tonight?", 1, "z"],
  ["hmu", "abbr", "nhắn hoặc gọi mình nhé (hit me up)", "hmu if you wanna hang", 1, "y"],
  ["lmk", "abbr", "báo mình biết nhé (let me know)", "lmk when you get home", 2, "a"],
  ["tmrw", "abbr", "ngày mai (tomorrow)", "see u tmrw!", 2, "a"],
  ["u", "abbr", "bạn (you)", "r u coming?", 1, "y"],
  ["ur", "abbr", "của bạn / bạn là (your / you're)", "ur so funny", 1, "y"],
  ["r u", "abbr", "bạn có… không? (are you)", "r u free tonight?", 1, "y"],
  ["bc", "abbr", "bởi vì (because)", "can't come bc i have work", 2, "a"],
  ["fyi", "abbr", "để bạn biết (for your information), hay dùng ở công sở", "fyi the meeting moved to 3", 3, "a"],
  ["imo", "abbr", "theo mình thì (in my opinion)", "imo the tacos are better", 2, "y"],
  ["pls", "abbr", "làm ơn, nha (please)", "pls bring snacks 🙏", 2, "a"],
  ["q", "abbr", "câu hỏi (question)", "random q, do u like sushi?", 1, "y"],
  ["omg", "abbr", "trời ơi (oh my god)", "omg yes!!", 2, "a"],

  ["no cap", "slang", "nói thật, không xạo đâu", "best pho in OC, no cap", 1, "z"],
  ["lowkey", "slang", "hơi hơi, kiểu ngầm ngầm (không nói to)", "i'm lowkey excited", 1, "z"],
  ["highkey", "slang", "rất, công khai luôn (ngược với lowkey)", "i highkey need a nap", 1, "z"],
  ["rizz", "slang", "khả năng tán tỉnh, sức hút", "bro has no rizz 💀", 1, "z"],
  ["bet", "slang", "ok, chốt! (đồng ý)", "— 7pm? — bet", 1, "z"],
  ["slay", "slang", "làm quá đỉnh, quá xuất sắc", "you slayed that presentation", 1, "z"],
  ["vibes", "slang", "cảm giác, bầu không khí", "this café has such good vibes", 2, "y"],
  ["bussin", "slang", "ngon bá cháy", "these tacos are bussin", 1, "z"],
  ["mid", "slang", "bình thường, tầm thường, không có gì đặc biệt", "the movie was mid tbh", 1, "z"],
  ["sus", "slang", "đáng ngờ, mờ ám", "that account looks sus", 1, "z"],
  ["it's giving", "slang", "toát ra vibe…, trông y như…", "that outfit? it's giving rich mom", 1, "z"],
  ["ate", "slang", "làm quá đỉnh (\"ăn trọn\" luôn)", "she ate that 🔥", 1, "z"],
  ["bestie", "slang", "bạn thân (hoặc cách gọi thân mật)", "bestie you need to see this", 1, "z"],
  ["deadass", "slang", "thật sự, nghiêm túc luôn", "i'm deadass starving", 1, "z"],
  ["say less", "slang", "khỏi nói nữa, chốt luôn (đồng ý ngay)", "— free food? — say less", 1, "z"],
  ["the ick", "slang", "cảm giác tự nhiên tụt mood, thấy ghét", "he chews so loud, gave me the ick", 1, "z"],
  ["rent free", "slang", "cứ nghĩ mãi trong đầu", "that song lives in my head rent free", 1, "z"],
  ["valid", "slang", "hợp lý, chấp nhận được", "pointing at the menu is valid", 1, "z"],
  ["i'm dead", "slang", "cười chết mất", "LOL i'm dead 💀", 1, "z"],
  ["extra", "slang", "làm quá, lố", "bringing a cake to a picnic is so extra", 1, "y"],
  ["spill the tea", "slang", "kể chuyện drama đi", "ok spill the tea, what happened?", 1, "z"],
  ["w", "slang", "thắng, điều tốt (win)", "free parking? huge W", 1, "z"],
  ["l", "slang", "thua, điều tệ (loss)", "they ran out of boba. massive L", 1, "z"],
  ["hits different", "slang", "cảm giác khác hẳn, tuyệt hơn hẳn", "coffee at 6am hits different", 1, "z"],
  ["goated", "slang", "đỉnh nhất, huyền thoại (từ GOAT)", "this taco truck is goated", 1, "z"],
  ["bruh", "slang", "trời ạ (bất lực, ngán ngẩm)", "bruh i locked my keys in the car", 1, "z"],
  ["bro", "slang", "ông bạn, mày ơi (gọi bạn, cả nam lẫn nữ)", "bro you're making me hungry", 1, "y"],
  ["sooo", "slang", "kéo dài chữ (sooo, yesss, heyyy) để tỏ ra hào hứng, thân thiện", "heyyy! i miss u sooo much", 1, "z"],
  ["squad", "slang", "hội bạn, nhóm bạn", "the whole squad is coming", 1, "y"],
  ["y'all", "slang", "các bạn, mọi người (you all)", "y'all ready?", 2, "a"],
  ["ghost", "slang", "lặn mất tăm, biến mất không trả lời", "sorry for ghosting u!", 1, "y"],

  ["oof", "react", "ui da, tội ghê (thấy tiếc, thấy đau giùm)", "— i failed my test — oof", 1, "y"],
  ["dang", "react", "trời, chà (ngạc nhiên hoặc tiếc, nhẹ hơn 'damn')", "dang that's expensive", 2, "a"],
  ["that's rough", "react", "tội ghê, căng thật (đồng cảm)", "— my car broke down — that's rough 😕", 2, "a"],
  ["no way", "react", "không thể nào! thật hả?", "no way!! congrats!", 2, "a"],
  ["yikes", "react", "ối, kinh quá (ngại, sợ giùm)", "yikes, 2 hours of traffic?", 2, "a"],
  ["aww", "react", "ôi dễ thương ghê / tội ghê", "aww that's so sweet", 2, "a"],
  ["sweet", "react", "tuyệt, ngon lành (= great)", "— i got tickets — sweet!", 2, "a"],
  ["sick", "react", "đỉnh, ngầu (nghĩa tích cực!)", "that car is sick", 1, "y"],
  ["ugh", "react", "ặc, chán ghê", "ugh mondays", 2, "a"],
  ["same", "react", "mình cũng vậy", "— i'm so tired — same", 2, "y"],
  ["mood", "react", "đúng tâm trạng mình luôn", "— i just want to sleep all day — mood", 1, "z"],
  ["fair", "react", "cũng đúng, hợp lý (fair enough)", "— i'm broke this week — fair", 2, "y"],
  ["love that", "react", "thích ghê, tuyệt quá", "you're learning to surf? love that", 2, "a"],
  ["that's wild", "react", "điên thật, không tin nổi", "he drove 6 hours for tacos? that's wild", 2, "y"],

  ["nice try", "banter", "định lừa à, còn lâu", "— i'm the better driver — nice try 😂", 2, "a"],
  ["we'll see about that", "banter", "để rồi xem (ai hơn ai)", "— i'll beat you — we'll see about that 😤", 2, "a"],
  ["says you", "banter", "đó là bạn nói thôi nha", "— i'm the funny one — says you", 2, "a"],
  ["in your dreams", "banter", "mơ đi", "— you'll buy me lunch — in your dreams", 2, "a"],
  ["bold of you to assume", "banter", "tự tin dữ ha khi nghĩ rằng…", "bold of you to assume i'll lose", 1, "y"],
  ["keep telling yourself that", "banter", "cứ tự nhủ vậy đi (mình không tin đâu)", "— i'm not scared — keep telling yourself that", 2, "a"],
  ["you wish", "banter", "bạn ước thôi", "— you miss me — you wish 😏", 2, "a"],
  ["big talk", "banter", "nói to ghê (để xem làm được không)", "big talk for someone who's always late", 1, "y"],
  ["just saying", "banter", "mình chỉ nói vậy thôi (thêm vào sau một câu châm chọc)", "you were late again, just saying", 2, "a"],
  ["touché", "banter", "chuẩn, câu này bạn thắng", "— you burned the rice last time — ok touché", 2, "a"],
  ["ok and?", "banter", "rồi sao? (tỉnh bơ)", "— you ate 3 burritos — ok and?", 1, "z"],

  ["i'm good", "decline", "thôi, mình không cần đâu (từ chối nhẹ nhàng)", "— want some? — i'm good, thanks!", 3, "a"],
  ["not my thing", "decline", "không hợp gu mình lắm", "karaoke isn't really my thing", 3, "a"],
  ["i'll pass", "decline", "lần này mình xin kiếu", "i'll pass this time, but have fun!", 3, "a"],
  ["rain check", "decline", "hẹn dịp khác nhé (dời lại, vẫn muốn đi)", "can i take a rain check?", 3, "a"],
  ["i can't make it", "decline", "mình không tới được", "sorry, i can't make it tonight", 3, "a"],
  ["wish i could", "decline", "ước gì mình đi được (từ chối mềm mỏng)", "wish i could! i have work", 3, "a"],
  ["sit this one out", "decline", "lần này mình không tham gia", "i'm gonna sit this one out", 2, "a"],
  ["i'm beat", "decline", "mình mệt rã rời", "i'm beat, gonna stay in tonight", 2, "a"],
  ["maybe next time", "decline", "để lần sau nhé", "maybe next time! 🙏", 3, "a"],
  ["swamped", "decline", "ngập đầu công việc", "i'm swamped this week, sorry!", 3, "a"],
  ["no pressure", "decline", "không ép đâu, tùy bạn", "come if you want, no pressure!", 3, "a"],

  ["down", "phrase", "sẵn sàng, ok đi (I'm down = mình tham gia)", "— tacos? — i'm down", 2, "y"],
  ["i'm in", "phrase", "mình tham gia", "bonfire saturday? i'm in", 2, "a"],
  ["count me in", "phrase", "tính cả mình nhé", "count me in!", 3, "a"],
  ["sounds good", "phrase", "nghe ổn đó, ok", "7pm? sounds good", 3, "a"],
  ["works for me", "phrase", "mình ok (giờ/ngày đó được)", "saturday works for me", 3, "a"],
  ["for sure", "phrase", "chắc chắn rồi", "— see u there? — for sure!", 2, "a"],
  ["no worries", "phrase", "không sao đâu", "no worries, take your time", 3, "a"],
  ["all good", "phrase", "không sao, ổn mà", "— sorry i'm late — all good!", 2, "a"],
  ["my bad", "phrase", "lỗi mình (xin lỗi nhẹ)", "my bad, i forgot to text back", 2, "a"],
  ["heads up", "phrase", "báo trước, lưu ý trước", "thanks for the heads up!", 3, "a"],
  ["grab", "phrase", "đi ăn/uống nhanh, mua nhanh (grab lunch/coffee)", "wanna grab lunch?", 3, "a"],
  ["hang out", "phrase", "đi chơi (người lớn KHÔNG dùng 'play')", "wanna hang out this weekend?", 3, "a"],
  ["catch up", "phrase", "hàn huyên / làm bù (catch up on sleep = ngủ bù)", "let's catch up soon!", 3, "a"],
  ["gonna", "phrase", "sẽ (going to)", "i'm gonna grab coffee", 2, "a"],
  ["wanna", "phrase", "muốn (want to)", "wanna come with?", 2, "a"],
  ["kinda", "phrase", "hơi hơi, kiểu (kind of)", "it's kinda far", 2, "a"],
  ["legit", "phrase", "xịn, chuẩn, thật sự", "this pho is legit", 1, "y"],
  ["yo", "phrase", "ê, này (chào kiểu bạn bè)", "yo what's up", 1, "y"],
  ["you're on", "phrase", "chơi luôn! (nhận lời thách)", "— race you? — you're on", 2, "a"],
  ["thank me later", "phrase", "rồi bạn sẽ cảm ơn mình", "try the bún bò, thank me later", 2, "a"],
  ["leave on read", "phrase", "đọc (seen) mà không trả lời", "don't leave me on read 😒", 1, "y"],
  ["word on the street", "phrase", "nghe đồn là", "word on the street is you can cook", 2, "a"],
  ["happy hour", "phrase", "đi uống sau giờ làm, lúc quán giảm giá", "happy hour at 5?", 3, "a"],
  ["venmo", "phrase", "app chuyển tiền; dùng như động từ: chuyển tiền cho ai", "i'll venmo you", 2, "y"],
  ["speaking my language", "phrase", "nói trúng ý mình", "free pizza? now you're speaking my language", 2, "a"],
  ["never hear the end of it", "phrase", "bị nhắc hoài, bị chọc mãi", "if i lose, i'll never hear the end of it", 2, "a"],
  ["carpool", "phrase", "đi chung xe", "wanna carpool?", 3, "a"],
  ["by the way", "phrase", "nhân tiện", "by the way, i finished the report", 3, "a"],
  ["i bet", "phrase", "chắc vậy rồi, mình đoán là", "i bet they kept you busy", 2, "a"],

  ["💀", "emoji", "\"chết cười\": cười quá trời (không phải buồn!)", "LMAO 💀", 1, "z"],
  ["😭", "emoji", "khóc, nhưng Gen Z dùng cho cười quá, xúc động, hay \"thèm quá\"", "i want boba so bad 😭", 1, "z"],
  ["😏", "emoji", "nhếch mép: tự tin, chọc ghẹo, đôi khi tán tỉnh", "we'll see 😏", 1, "y"],
  ["😌", "emoji", "mãn nguyện, tự hào nhẹ, kiểu \"biết mà\"", "told you 😌", 1, "y"],
  ["🙈", "emoji", "ngại, xấu hổ một cách dễ thương", "i sent that to the wrong person 🙈", 1, "a"],
  ["👀", "emoji", "tò mò, hóng chuyện, \"để ý nha\"", "so who's coming 👀", 1, "y"],
  ["🙏", "emoji", "cảm ơn / làm ơn (không phải cầu nguyện)", "pls 🙏", 2, "a"],
  ["🫶", "emoji", "trái tim bằng tay: thương, cảm ơn", "ty bestie 🫶", 1, "z"],
  ["😤", "emoji", "quyết tâm, hừ (thường không phải giận thật)", "game on 😤", 1, "y"],
];

export const LEXICON = Object.fromEntries(
  LEX.map(([term, cat, vi, ex, f, who]) => [term, { term, cat, vi, ex, f, who }])
);

// Kịch bản: mỗi lượt (turn) gồm các tin của nhân vật và 3 câu trả lời gợi ý (an toàn → táo bạo).
// s: các mục trong LEXICON xuất hiện trong tin.
export const SCENARIOS = [
  {
    id: "plans", emoji: "📅", title: "Rủ đi chơi", en: "Making plans", chars: ["mia"],
    desc: "Mia rủ bạn đi uống trà sữa cuối tuần.",
    turns: [
      {
        msgs: [
          { from: "mia", t: "heyyy 👋", vi: "Heyyy 👋", tone: "friendly", s: ["sooo"] },
          { from: "mia", t: "r u free this weekend?? i've been craving boba sooo bad rn 😭", vi: "Cuối tuần này bạn rảnh không?? Mình đang thèm trà sữa kinh khủng luôn 😭", tone: "friendly", s: ["r u", "sooo", "rn", "😭"] },
        ],
        replies: [
          { en: "Hey! Yeah I'm free Saturday. Where do you wanna go?", vi: "Hey! Ừ thứ Bảy mình rảnh. Bạn muốn đi đâu?", s: ["wanna"] },
          { en: "omg yes, I'm down! boba sounds perfect rn", vi: "Trời ơi có chứ, mình đi! Trà sữa lúc này là chuẩn bài", s: ["omg", "down", "rn"] },
          { en: "ur speaking my language 😌 saturday?", vi: "Nói trúng ý mình rồi đó 😌 Thứ Bảy nhé?", s: ["ur", "speaking my language", "😌"] },
        ],
      },
      {
        msgs: [
          { from: "mia", t: "yesss ok bet 🙌", vi: "Yesss ok chốt 🙌", tone: "friendly", s: ["sooo", "bet"] },
          { from: "mia", t: "there's this new spot in irvine that's lowkey bussin. their brown sugar milk tea hits different fr", vi: "Có quán mới ở Irvine ngon phết luôn. Trà sữa đường đen ở đó uống đã hơn hẳn, thật đó", tone: "friendly", s: ["lowkey", "bussin", "hits different", "fr"] },
        ],
        replies: [
          { en: "Sounds good! What time works for you?", vi: "Nghe được đó! Mấy giờ thì bạn tiện?", s: ["sounds good"] },
          { en: "ngl I've never tried brown sugar boba. what time?", vi: "Nói thật mình chưa thử trà sữa đường đen bao giờ. Mấy giờ?", s: ["ngl"] },
          { en: "ok but if it's mid I'm blaming u 😏", vi: "Ok nhưng nếu dở dở là mình đổ tại bạn đó nha 😏", s: ["mid", "u", "😏"] },
        ],
      },
      {
        msgs: [
          { from: "mia", t: "LMAOO deal 💀", vi: "Haha chịu luôn 💀", tone: "teasing", s: ["lmao", "💀"] },
          { from: "mia", t: "ok 2pm? i can pick u up if u want, it's on my way", vi: "Ok 2 giờ chiều nhé? Mình ghé đón bạn được nếu bạn muốn, tiện đường mà", tone: "friendly", s: ["u"] },
        ],
        replies: [
          { en: "2pm works for me! Thanks, that'd be awesome", vi: "2 giờ ok với mình! Cảm ơn nha, vậy thì tuyệt", s: ["works for me"] },
          { en: "perfect, I'm down. ty for the ride!", vi: "Hoàn hảo, mình ok. Cảm ơn vì cho đi nhờ nha!", s: ["down", "ty"] },
          { en: "a free ride AND boba? say less 😌", vi: "Được đưa đón LẠI còn có trà sữa? Khỏi nói nữa 😌", s: ["say less", "😌"] },
        ],
      },
      {
        msgs: [
          { from: "mia", t: "yay ok it's a plan!! 🫶", vi: "Yay ok chốt kèo nha!! 🫶", tone: "friendly", s: ["🫶"] },
          { from: "mia", t: "lmk if anything changes. ttyl!", vi: "Có gì thay đổi thì báo mình nha. Nói chuyện sau!", tone: "friendly", s: ["lmk", "ttyl"] },
        ],
        replies: [
          { en: "Will do! See you Saturday!", vi: "Ok nha! Hẹn thứ Bảy!" },
          { en: "sounds good, see u saturday 🙌", vi: "Ok luôn, thứ Bảy gặp nha 🙌", s: ["sounds good", "u"] },
          { en: "can't wait 🧋 ttyl!", vi: "Mong quá đi 🧋 Nói chuyện sau nha!", s: ["ttyl"] },
        ],
      },
    ],
  },
  {
    id: "smalltalk", emoji: "☕", title: "Nói chuyện phiếm", en: "Small talk", chars: ["derek"],
    desc: "Sáng thứ Hai, Derek nhắn hỏi thăm cuối tuần của bạn.",
    turns: [
      {
        msgs: [
          { from: "derek", t: "Morning! How was your weekend?", vi: "Chào buổi sáng! Cuối tuần của bạn sao rồi?", tone: "friendly" },
          { from: "derek", t: "Mine went by way too fast lol", vi: "Cuối tuần của mình trôi nhanh quá trời haha", tone: "friendly", s: ["lol"] },
        ],
        replies: [
          { en: "Morning! It was good, pretty relaxing. How about yours?", vi: "Chào buổi sáng! Cũng vui, khá thư giãn. Còn bạn thì sao?" },
          { en: "It was nice! Went to the beach with some friends. Wbu?", vi: "Vui lắm! Mình đi biển với mấy người bạn. Còn bạn?", s: ["wbu"] },
          { en: "Way too short lol. I need another one already 😅", vi: "Ngắn quá trời haha. Mình cần thêm một cuối tuần nữa rồi đây 😅", s: ["lol"] },
        ],
      },
      {
        msgs: [
          { from: "derek", t: "Haha same. Took the kids to the Irvine Spectrum, total chaos", vi: "Haha mình cũng vậy. Dẫn tụi nhỏ đi Irvine Spectrum, loạn hết cả lên", tone: "friendly", s: ["same"] },
          { from: "derek", t: "Btw did you hear we're getting new laptops next week?", vi: "À mà bạn nghe tin tuần sau tụi mình được phát laptop mới chưa?", tone: "friendly", s: ["btw"] },
        ],
        replies: [
          { en: "Sounds fun! No, I didn't hear about that. When?", vi: "Nghe vui ghê! Chưa, mình chưa nghe. Khi nào vậy?" },
          { en: "lol I can imagine. Wait really? That's awesome", vi: "Haha mình hình dung được luôn. Ủa thật hả? Tuyệt quá", s: ["lol"] },
          { en: "Chaos is the best kind of fun 😂 and finally, my laptop is so slow", vi: "Loạn mới vui chứ 😂 Mà cuối cùng cũng có, laptop mình chậm kinh khủng" },
        ],
      },
      {
        msgs: [
          { from: "derek", t: "Yeah IT sent an email Friday. FYI they want everything backed up by Wed", vi: "Ừ, bên IT gửi email hôm thứ Sáu. Nói bạn biết, họ muốn mọi người sao lưu dữ liệu xong trước thứ Tư", tone: "serious", s: ["fyi"] },
          { from: "derek", t: "Not fun but should be worth it", vi: "Không vui gì nhưng chắc cũng đáng", tone: "friendly" },
        ],
        replies: [
          { en: "Thanks for the heads up! I'll do it today.", vi: "Cảm ơn đã báo trước nha! Mình làm luôn hôm nay.", s: ["heads up"] },
          { en: "Ugh ok, ty for letting me know", vi: "Ặc ok, cảm ơn đã cho mình biết", s: ["ugh", "ty"] },
          { en: "Good to know. Guess I'm finally cleaning my desktop lol", vi: "Biết vậy cũng tốt. Chắc cuối cùng mình cũng phải dọn màn hình máy tính rồi haha", s: ["lol"] },
        ],
      },
      {
        msgs: [
          { from: "derek", t: "No problem 👍 Anyway, I'm gonna grab coffee before the 10am meeting. Want anything?", vi: "Không có gì 👍 Mà nè, mình đi mua cà phê trước cuộc họp 10 giờ. Bạn muốn uống gì không?", tone: "friendly", s: ["gonna", "grab"] },
        ],
        replies: [
          { en: "I'm good, thank you though!", vi: "Mình không cần đâu, dù sao cũng cảm ơn nha!", s: ["i'm good"] },
          { en: "Oh yes please! Just an iced latte, I'll Venmo you", vi: "Ồ có chứ! Cho mình một ly latte đá, mình chuyển tiền qua Venmo nha", s: ["venmo"] },
          { en: "You're a lifesaver. Large iced coffee pls 🙏", vi: "Bạn đúng là cứu tinh. Cho mình ly cà phê đá size lớn nha 🙏", s: ["pls", "🙏"] },
        ],
      },
    ],
  },
  {
    id: "weekend", emoji: "🌤️", title: "Chuyện cuối tuần", en: "Weekend chat", chars: ["linda"],
    desc: "Linda, hàng xóm lớn tuổi, kể chuyện cuối tuần với cháu.",
    turns: [
      {
        msgs: [
          { from: "linda", t: "Good morning, dear! I hope you had a nice weekend.", vi: "Chào buổi sáng con! Mong là cuối tuần của con vui vẻ. (\"dear\" là cách người lớn tuổi gọi thân mật)", tone: "friendly" },
          { from: "linda", t: "My grandkids came over on Saturday, and I am still recovering. 😊", vi: "Mấy đứa cháu qua chơi hôm thứ Bảy, giờ cô vẫn còn đang hồi sức đây. 😊", tone: "friendly" },
        ],
        replies: [
          { en: "Good morning, Linda! I did, thank you. How old are your grandkids?", vi: "Chào buổi sáng cô Linda! Vui lắm ạ, cảm ơn cô. Cháu cô mấy tuổi rồi ạ?" },
          { en: "Aww that sounds fun! I bet they kept you busy", vi: "Ôi nghe vui ghê! Chắc tụi nhỏ làm cô bận rộn lắm", s: ["aww", "i bet"] },
          { en: "Haha sounds like they wore you out! What did you guys do?", vi: "Haha nghe như tụi nhỏ làm cô mệt lử luôn! Mọi người đã làm gì vậy cô?" },
        ],
      },
      {
        msgs: [
          { from: "linda", t: "They are 6 and 9. We baked cookies and made a terrible mess in the kitchen.", vi: "Tụi nó 6 tuổi với 9 tuổi. Bà cháu nướng bánh quy và bày bừa nhà bếp kinh khủng.", tone: "friendly" },
          { from: "linda", t: "What did you do this weekend? Anything fun?", vi: "Còn con cuối tuần làm gì? Có gì vui không?", tone: "friendly" },
        ],
        replies: [
          { en: "That sounds lovely! I just stayed home and rested.", vi: "Nghe dễ thương quá! Con chỉ ở nhà nghỉ ngơi thôi." },
          { en: "Cookies! That's so sweet. I went to a farmers market in Huntington Beach.", vi: "Bánh quy! Dễ thương ghê. Con đi chợ nông sản ở Huntington Beach." },
          { en: "I'm jealous, I want cookies too 😄 I mostly just cleaned and caught up on sleep", vi: "Ghen tị ghê, con cũng muốn ăn bánh 😄 Con chủ yếu dọn nhà với ngủ bù thôi", s: ["catch up"] },
        ],
      },
      {
        msgs: [
          { from: "linda", t: "Oh, that sounds nice! Sometimes a quiet weekend is exactly what we need.", vi: "Ồ, nghe hay đó! Đôi khi một cuối tuần yên tĩnh chính là thứ mình cần.", tone: "friendly" },
          { from: "linda", t: "By the way, I made too many cookies. Would you like me to bring some over?", vi: "À nhân tiện, cô làm dư bánh quy quá. Con có muốn cô mang qua cho ít không?", tone: "friendly", s: ["by the way"] },
        ],
        replies: [
          { en: "That's so kind of you! Yes, I'd love some. Thank you!", vi: "Cô tốt quá! Dạ có, con thích lắm. Cảm ơn cô!" },
          { en: "Aw, you don't have to, but I won't say no 😄", vi: "Ôi cô không cần đâu, nhưng con cũng không từ chối đâu 😄", s: ["aww"] },
          { en: "Linda, you're the best! I'll trade you some Vietnamese coffee for them ☕", vi: "Cô Linda là nhất! Con đổi cho cô ít cà phê Việt Nam nha ☕" },
        ],
      },
      {
        msgs: [
          { from: "linda", t: "Wonderful! I will drop them off this afternoon around 3.", vi: "Tuyệt quá! Khoảng 3 giờ chiều nay cô mang qua nhé.", tone: "friendly" },
          { from: "linda", t: "Please let me know if that time does not work for you.", vi: "Nếu giờ đó con không tiện thì báo cô nhé. (Người lớn tuổi hay viết đầy đủ \"does not\" thay vì \"doesn't\")", tone: "friendly" },
        ],
        replies: [
          { en: "3 works great. Thank you so much!", vi: "3 giờ được lắm ạ. Cảm ơn cô nhiều!" },
          { en: "Perfect, I'll be home. See you then!", vi: "Tuyệt, con sẽ ở nhà. Hẹn gặp cô lúc đó!" },
          { en: "Sounds perfect. I'll have the coffee ready ☕", vi: "Hoàn hảo luôn. Con sẽ pha cà phê sẵn ☕" },
        ],
      },
    ],
  },
  {
    id: "food", emoji: "🍜", title: "Giới thiệu món ăn", en: "Food recommendations", chars: ["sam"],
    desc: "Sam hỏi bạn chỗ ăn phở ngon ở Little Saigon.",
    turns: [
      {
        msgs: [
          { from: "sam", t: "yo neighbor 👋 random q", vi: "Ê hàng xóm 👋 hỏi cái này hơi ngẫu nhiên nha", tone: "friendly", s: ["yo", "q"] },
          { from: "sam", t: "you're Vietnamese right? where do I get legit pho around here? the place by my work is kinda mid", vi: "Bạn là người Việt đúng không? Ăn phở chuẩn vị ở đâu quanh đây vậy? Quán gần chỗ mình làm hơi bị bình thường", tone: "friendly", s: ["legit", "kinda", "mid"] },
        ],
        replies: [
          { en: "Haha yes! Try Little Saigon in Westminster. The pho there is the real deal.", vi: "Haha đúng rồi! Thử Little Saigon ở Westminster đi. Phở ở đó mới đúng chuẩn." },
          { en: "oh you came to the right person 😌 go to Little Saigon in Westminster. trust me", vi: "Ồ hỏi đúng người rồi đó 😌 Qua Little Saigon ở Westminster đi. Tin mình", s: ["😌"] },
          { en: "\"kinda mid\" pho is a crime 😭 I'll fix this for you. Little Saigon, this weekend", vi: "Phở \"bình thường\" là tội ác đó 😭 Để mình xử lý vụ này. Little Saigon, cuối tuần này", s: ["mid", "😭"] },
        ],
      },
      {
        msgs: [
          { from: "sam", t: "LOL ok i trust you 🙏", vi: "Haha ok mình tin bạn 🙏", tone: "friendly", s: ["lol", "🙏"] },
          { from: "sam", t: "should i order anything besides pho? i always panic and just point at the menu 😅", vi: "Ngoài phở mình nên gọi món gì nữa? Lần nào mình cũng hoảng rồi chỉ đại vào menu 😅", tone: "friendly" },
        ],
        replies: [
          { en: "Try bún bò Huế, it's a spicy beef noodle soup. So good!", vi: "Thử bún bò Huế đi, bún bò cay đó. Ngon lắm!" },
          { en: "get bún bò Huế if you like spicy. and a Vietnamese iced coffee, no cap", vi: "Nếu thích cay thì gọi bún bò Huế. Thêm ly cà phê sữa đá nữa, nói thật đó", s: ["no cap"] },
          { en: "pointing at the menu is valid tbh 😂 but try bún bò Huế, thank me later", vi: "Chỉ vào menu cũng hợp lý mà 😂 nhưng thử bún bò Huế đi, rồi cảm ơn mình sau", s: ["valid", "tbh", "thank me later"] },
        ],
      },
      {
        msgs: [
          { from: "sam", t: "bro you're making me hungry rn", vi: "Trời ơi bạn làm mình đói luôn rồi đó", tone: "friendly", s: ["bro", "rn"] },
          { from: "sam", t: "wanna come with? my treat since you're the expert 😏", vi: "Đi chung không? Mình bao, vì bạn là chuyên gia mà 😏", tone: "teasing", s: ["wanna", "😏"] },
        ],
        replies: [
          { en: "Sure, I'd love to! When are you free?", vi: "Được chứ, mình rất muốn! Khi nào bạn rảnh?" },
          { en: "I'm down! but I'm ordering for you, no pointing allowed 😂", vi: "Mình đi! Nhưng mình gọi món cho bạn, cấm chỉ menu nha 😂", s: ["down"] },
          { en: "free pho? say less. saturday?", vi: "Phở miễn phí hả? Chốt luôn. Thứ Bảy nhé?", s: ["say less"] },
        ],
      },
      {
        msgs: [
          { from: "sam", t: "deal. saturday noon 🍜", vi: "Chốt. Trưa thứ Bảy 🍜", tone: "friendly" },
          { from: "sam", t: "if it's bussin you're officially my food guide lol", vi: "Nếu ngon bá cháy thì bạn chính thức thành hướng dẫn viên ẩm thực của mình nha haha", tone: "teasing", s: ["bussin", "lol"] },
        ],
        replies: [
          { en: "Deal! See you Saturday.", vi: "Chốt! Hẹn thứ Bảy." },
          { en: "bet. prepare to be amazed 😎", vi: "Ok chốt. Chuẩn bị bị \"choáng\" đi nha 😎", s: ["bet"] },
          { en: "and if it's not, I'll never hear the end of it 💀", vi: "Còn nếu không ngon thì chắc mình bị bạn nhắc hoài luôn 💀", s: ["never hear the end of it", "💀"] },
        ],
      },
    ],
  },
  {
    id: "banter", emoji: "🏓", title: "Chọc ghẹo, đối đáp", en: "Teasing & banter", chars: ["sam"],
    desc: "Sam thách bạn đấu pickleball, thua thì bao burrito.",
    turns: [
      {
        msgs: [
          { from: "sam", t: "so I heard you think you're good at pickleball now 👀", vi: "Nghe nói dạo này bạn nghĩ mình chơi pickleball giỏi rồi hả 👀", tone: "teasing", s: ["👀"] },
          { from: "sam", t: "word on the street is you've been practicing", vi: "Nghe đồn là bạn đang tập luyện dữ lắm", tone: "teasing", s: ["word on the street"] },
        ],
        replies: [
          { en: "Haha I'm still learning! Who told you that?", vi: "Haha mình vẫn đang học mà! Ai nói với bạn vậy?" },
          { en: "\"good\" is a strong word lol. but I'm getting better", vi: "\"Giỏi\" thì hơi quá nha haha. Nhưng mình đang tiến bộ", s: ["lol"] },
          { en: "I don't think, I know 😏", vi: "Không phải nghĩ, mà là biết chắc 😏", s: ["😏"] },
        ],
      },
      {
        msgs: [
          { from: "sam", t: "lmaooo ok confidence", vi: "Haha ok tự tin dữ ta", tone: "sarcastic", s: ["lmao"] },
          { from: "sam", t: "saturday 9am. me vs you. loser buys breakfast burritos 🌯", vi: "9 giờ sáng thứ Bảy. Bạn với mình. Ai thua bao burrito ăn sáng 🌯", tone: "teasing" },
        ],
        replies: [
          { en: "Ok, you're on! See you Saturday.", vi: "Ok, chơi luôn! Hẹn thứ Bảy.", s: ["you're on"] },
          { en: "deal. hope you like paying for burritos 😌", vi: "Chốt. Mong là bạn thích trả tiền burrito 😌", s: ["😌"] },
          { en: "bold of you to assume you'll win 💀", vi: "Tự tin dữ ha khi nghĩ là bạn sẽ thắng 💀", s: ["bold of you to assume", "💀"] },
        ],
      },
      {
        msgs: [
          { from: "sam", t: "big talk for someone who missed every serve last time 😂", vi: "Nói to ghê cho một người lần trước giao bóng hụt hết 😂", tone: "teasing", s: ["big talk"] },
          { from: "sam", t: "just saying", vi: "Nói vậy thôi nha", tone: "sarcastic", s: ["just saying"] },
        ],
        replies: [
          { en: "Hey, that was my first time! 😅", vi: "Ê, lần đó là lần đầu của mình mà! 😅" },
          { en: "nice try, I've been practicing every day 😤", vi: "Định khích mình hả, còn lâu, ngày nào mình cũng tập 😤", s: ["nice try", "😤"] },
          { en: "keep telling yourself that. see you on the court 😎", vi: "Cứ tự nhủ vậy đi. Gặp nhau trên sân nhé 😎", s: ["keep telling yourself that"] },
        ],
      },
      {
        msgs: [
          { from: "sam", t: "we'll see about that 😤", vi: "Để rồi xem 😤", tone: "teasing", s: ["we'll see about that", "😤"] },
          { from: "sam", t: "don't forget your wallet 😘", vi: "Nhớ mang ví nha 😘 (ý là: chuẩn bị trả tiền đi)", tone: "teasing" },
        ],
        replies: [
          { en: "Haha see you Saturday!", vi: "Haha hẹn thứ Bảy!" },
          { en: "you're the one who needs a wallet 😏", vi: "Người cần mang ví là bạn đó 😏", s: ["😏"] },
          { en: "in your dreams. I'm ordering 2 burritos btw 🌯🌯", vi: "Mơ đi. À mà mình sẽ gọi 2 cái burrito đó 🌯🌯", s: ["in your dreams", "btw"] },
        ],
      },
    ],
  },
  {
    id: "decline", emoji: "🙅", title: "Từ chối lịch sự", en: "Declining politely", chars: ["derek"],
    desc: "Derek rủ đi happy hour và nhờ bạn làm thay ca. Tập từ chối khéo.",
    turns: [
      {
        msgs: [
          { from: "derek", t: "Hey! A few of us are doing happy hour after work Thursday at that brewery on Main St 🍻", vi: "Hey! Thứ Năm sau giờ làm vài người tụi mình đi happy hour ở quán bia trên đường Main 🍻", tone: "friendly", s: ["happy hour"] },
          { from: "derek", t: "You should come! It'll be fun", vi: "Bạn đi chung đi! Vui lắm", tone: "friendly" },
        ],
        replies: [
          { en: "Thanks for the invite! I can't make it Thursday unfortunately.", vi: "Cảm ơn đã rủ nha! Tiếc là thứ Năm mình không đi được.", s: ["i can't make it"] },
          { en: "Aw I wish I could, but I've got plans that night. Next time for sure!", vi: "Ôi ước gì đi được, mà tối đó mình có hẹn rồi. Lần sau chắc chắn nha!", s: ["wish i could", "for sure"] },
          { en: "Ahh I'm gonna sit this one out, I'm beat after this week 😅 rain check?", vi: "Ahh lần này mình xin kiếu, tuần này mình mệt rã rời 😅 Hẹn dịp khác nhé?", s: ["sit this one out", "i'm beat", "rain check"] },
        ],
      },
      {
        msgs: [
          { from: "derek", t: "Aw come on, just one drink! 😄", vi: "Ôi thôi mà, một ly thôi! 😄", tone: "pushy" },
          { from: "derek", t: "Everyone's gonna be there", vi: "Mọi người đều đi hết đó", tone: "pushy", s: ["gonna"] },
        ],
        replies: [
          { en: "I really appreciate it, but I'll have to pass this time.", vi: "Mình rất cảm kích, nhưng lần này mình xin kiếu.", s: ["i'll pass"] },
          { en: "Haha I know, I know. Honestly drinking isn't really my thing, but have fun!", vi: "Haha biết rồi biết rồi. Thật ra nhậu không phải gu của mình lắm, nhưng chúc vui nha!", s: ["not my thing"] },
          { en: "Tempting, but my couch and I have a date Thursday 😂 Next one for sure", vi: "Hấp dẫn đó, nhưng thứ Năm mình có hẹn với cái ghế sofa rồi 😂 Lần sau chắc chắn", s: ["for sure"] },
        ],
      },
      {
        msgs: [
          { from: "derek", t: "Haha fair enough, no pressure!", vi: "Haha cũng hợp lý, không ép đâu!", tone: "friendly", s: ["fair", "no pressure"] },
          { from: "derek", t: "Next time then 👍", vi: "Vậy để lần sau 👍", tone: "friendly" },
        ],
        replies: [
          { en: "Definitely! Thanks for understanding.", vi: "Chắc chắn rồi! Cảm ơn bạn đã thông cảm." },
          { en: "For sure! Send me pics lol", vi: "Chắc luôn! Gửi hình cho mình xem nha haha", s: ["for sure", "lol"] },
          { en: "100%. and save me a seat next time 🙌", vi: "100%. Lần sau nhớ chừa chỗ cho mình nha 🙌" },
        ],
      },
      {
        msgs: [
          { from: "derek", t: "Will do 😎", vi: "Ok luôn 😎", tone: "friendly" },
          { from: "derek", t: "Also, totally unrelated, but any chance you could cover my shift Saturday? 🙏", vi: "À, chuyện khác hoàn toàn nè, bạn làm thay ca thứ Bảy cho mình được không? 🙏", tone: "serious", s: ["🙏"] },
        ],
        replies: [
          { en: "Sorry, I can't this Saturday. I've already got plans.", vi: "Xin lỗi nha, thứ Bảy này mình không được. Mình có kế hoạch rồi." },
          { en: "Ah I wish I could, but I'm busy Saturday. Maybe ask Kevin?", vi: "Ah ước gì giúp được, mà thứ Bảy mình bận. Thử hỏi Kevin xem?", s: ["wish i could"] },
          { en: "Ooh sorry, Saturday's a no for me 😬 Hope you find someone!", vi: "Ối xin lỗi, thứ Bảy thì mình chịu 😬 Mong bạn tìm được người!" },
        ],
      },
      {
        msgs: [
          { from: "derek", t: "No worries, I'll ask around. Thanks anyway!", vi: "Không sao, để mình hỏi thử mọi người. Dù sao cũng cảm ơn nha!", tone: "friendly", s: ["no worries"] },
        ],
        replies: [
          { en: "Good luck! See you tomorrow.", vi: "Chúc may mắn! Mai gặp nha." },
          { en: "Np! Hope it works out", vi: "Không có gì! Mong là ổn cả", s: ["np"] },
          { en: "You got this 💪 lmk if I can help another time", vi: "Bạn làm được mà 💪 Lần khác cần gì thì báo mình nha", s: ["lmk"] },
        ],
      },
    ],
  },
  {
    id: "group", emoji: "🏖️", title: "Nhóm chat", en: "Group chat", chars: ["sam", "mia", "derek"], group: "🏖️ beach crew",
    desc: "Cả nhóm lên kế hoạch đốt lửa trại ở Huntington Beach.",
    turns: [
      {
        msgs: [
          { from: "sam", t: "ok who's down for a bonfire at huntington this saturday 🔥", vi: "Ok ai đi đốt lửa trại ở Huntington thứ Bảy này nào 🔥", tone: "friendly", s: ["down"] },
          { from: "mia", t: "MEEE 🙋‍♀️", vi: "MÌNHHH 🙋‍♀️", tone: "friendly", s: ["sooo"] },
          { from: "derek", t: "I'm in, but I can only stay till like 9", vi: "Mình đi, nhưng mình chỉ ở được tới tầm 9 giờ thôi", tone: "friendly", s: ["i'm in"] },
        ],
        replies: [
          { en: "I'm in too! What should I bring?", vi: "Mình cũng đi! Mình nên mang gì?", s: ["i'm in"] },
          { en: "count me in 🙌 what time are we meeting?", vi: "Tính cả mình nha 🙌 Mấy giờ gặp nhau?", s: ["count me in"] },
          { en: "y'all really planned this without me?? jk I'm so down 😂", vi: "Mọi người lên kế hoạch mà không có mình hả?? Đùa thôi, mình đi liền 😂", s: ["y'all", "jk", "down"] },
        ],
      },
      {
        msgs: [
          { from: "mia", t: "yesss the whole squad 🥹", vi: "Yesss đủ cả hội luôn 🥹", tone: "friendly", s: ["sooo", "squad"] },
          { from: "sam", t: "can u bring snacks? i got the firewood", vi: "Bạn mang đồ ăn vặt được không? Mình lo củi rồi", tone: "friendly", s: ["u"] },
          { from: "derek", t: "I'll bring the speaker 🎶", vi: "Mình mang loa 🎶", tone: "friendly" },
        ],
        replies: [
          { en: "Sure, I can bring snacks!", vi: "Được chứ, mình mang đồ ăn vặt!" },
          { en: "bet, I'll bring chips and some Vietnamese snacks", vi: "Chốt, mình mang snack khoai tây với ít đồ ăn vặt Việt Nam", s: ["bet"] },
          { en: "say less. prepare for the best snacks of your life 😌", vi: "Khỏi nói. Chuẩn bị thưởng thức đồ ăn vặt ngon nhất đời đi 😌", s: ["say less", "😌"] },
        ],
      },
      {
        msgs: [
          { from: "mia", t: "ooh vietnamese snacks?? 👀", vi: "Ồ đồ ăn vặt Việt Nam hả?? 👀", tone: "friendly", s: ["👀"] },
          { from: "mia", t: "pls bring those shrimp chips 🙏 they're addictive", vi: "Mang bánh phồng tôm nha 🙏 ăn ghiền lắm", tone: "friendly", s: ["pls", "🙏"] },
          { from: "sam", t: "lowkey hyped for this ngl", vi: "Nói thật là mình hơi bị háo hức đó", tone: "friendly", s: ["lowkey", "ngl"] },
        ],
        replies: [
          { en: "Ok! I'll bring shrimp chips for you, Mia.", vi: "Ok! Mình mang bánh phồng tôm cho Mia nha." },
          { en: "already on my list lol. anything else?", vi: "Có trong danh sách rồi haha. Còn gì nữa không?", s: ["lol"] },
          { en: "only if you share your s'mores 😏", vi: "Chỉ khi bạn chia bánh s'mores cho mình thôi 😏", s: ["😏"] },
        ],
      },
      {
        msgs: [
          { from: "sam", t: "ok so 5pm at tower 20? parking is a nightmare after that", vi: "Ok vậy 5 giờ chiều ở trạm cứu hộ số 20 nhé? Sau giờ đó đậu xe là ác mộng", tone: "friendly" },
          { from: "derek", t: "Works for me 👍", vi: "Mình ok 👍", tone: "friendly", s: ["works for me"] },
          { from: "mia", t: "omw already in spirit 😂", vi: "Tinh thần thì mình đang trên đường tới rồi 😂", tone: "teasing", s: ["omw"] },
        ],
        replies: [
          { en: "5pm works! See you guys there.", vi: "5 giờ được! Gặp mọi người ở đó nha." },
          { en: "sounds good, I can carpool if anyone needs a ride", vi: "Ok luôn, ai cần đi nhờ thì đi chung xe với mình", s: ["sounds good", "carpool"] },
          { en: "5pm it is. last one there buys gas station ice cream 🍦", vi: "Chốt 5 giờ. Ai tới cuối bao kem ở cây xăng 🍦" },
        ],
      },
    ],
  },
  {
    id: "followup", emoji: "⏰", title: "Trả lời sau khi im lặng", en: "Following up after no reply", chars: ["mia"],
    desc: "Bạn quên trả lời Mia 2 ngày rồi. Giờ cô ấy nhắn lại.",
    history: [
      { from: "mia", t: "hey did u wanna see that new movie friday? 🍿", vi: "Hey bạn có muốn đi xem phim mới đó vào thứ Sáu không? 🍿", tone: "friendly", s: ["u"], stamp: "2 ngày trước · Đã xem" },
    ],
    turns: [
      {
        msgs: [
          { from: "mia", t: "helloooo?? 👀", vi: "Alôôô?? 👀", tone: "teasing", s: ["sooo", "👀"] },
          { from: "mia", t: "u alive? 😂", vi: "Bạn còn sống không đó? 😂", tone: "teasing", s: ["u"] },
        ],
        replies: [
          { en: "Sorry for the late reply! I've been so busy this week.", vi: "Xin lỗi trả lời trễ nha! Tuần này mình bận quá." },
          { en: "omg I'm so sorry, I totally forgot to reply 😭 yes I'm alive lol", vi: "Trời ơi xin lỗi nha, mình quên trả lời mất 😭 Ừ mình còn sống haha", s: ["omg", "😭", "lol"] },
          { en: "barely alive 💀 work has been insane. my bad for ghosting!", vi: "Sống sót suýt soát 💀 Công việc điên luôn. Lỗi mình vì lặn mất tăm!", s: ["💀", "my bad", "ghost"] },
        ],
      },
      {
        msgs: [
          { from: "mia", t: "lol all good, no worries", vi: "Haha không sao, đừng lo", tone: "friendly", s: ["lol", "all good", "no worries"] },
          { from: "mia", t: "so... movie friday? yes or no 😤", vi: "Vậy... thứ Sáu xem phim không? Có hay không 😤", tone: "pushy", s: ["😤"] },
        ],
        replies: [
          { en: "Yes! I'd love to. What time?", vi: "Có! Mình rất muốn. Mấy giờ?" },
          { en: "yesss I'm down. 7pm?", vi: "Có chứ, mình đi. 7 giờ tối nhé?", s: ["sooo", "down"] },
          { en: "ok ok yes 😂 I owe you popcorn for ghosting u", vi: "Ok ok có 😂 Mình nợ bạn bỏng ngô vì vụ lặn mất tăm", s: ["ghost", "u"] },
        ],
      },
      {
        msgs: [
          { from: "mia", t: "yay!! 7:30 at the AMC at the district?", vi: "Yay!! 7 rưỡi ở rạp AMC khu The District nhé?", tone: "friendly" },
          { from: "mia", t: "and don't leave me on read this time 😒", vi: "Và lần này đừng có seen mà không trả lời nha 😒", tone: "teasing", s: ["leave on read"] },
        ],
        replies: [
          { en: "7:30 works. I promise I'll reply faster!", vi: "7 rưỡi được. Mình hứa sẽ trả lời nhanh hơn!" },
          { en: "deal 😂 I won't leave you on read, promise", vi: "Chốt 😂 Mình không seen rồi im nữa đâu, hứa", s: ["leave on read"] },
          { en: "no promises 😏 jk see u there", vi: "Không hứa trước đâu 😏 Đùa thôi, gặp ở đó nha", s: ["😏", "jk", "u"] },
        ],
      },
      {
        msgs: [
          { from: "mia", t: "lmaooo ur the worst 💀", vi: "Haha bạn tệ nhất luôn 💀 (nói đùa, ý là thân)", tone: "teasing", s: ["lmao", "ur", "💀"] },
          { from: "mia", t: "see u friday!! 🍿", vi: "Thứ Sáu gặp nha!! 🍿", tone: "friendly", s: ["u"] },
        ],
        replies: [
          { en: "See you Friday!", vi: "Hẹn thứ Sáu!" },
          { en: "haha can't wait! 🍿", vi: "Haha mong quá! 🍿" },
          { en: "the worst AND your favorite 😌 see u friday", vi: "Tệ nhất NHƯNG cũng là người bạn thích nhất 😌 Thứ Sáu gặp nha", s: ["😌", "u"] },
        ],
      },
    ],
  },
];

// Câu trả lời thiếu tự nhiên, dùng làm phương án nhiễu trong quiz "chọn câu trả lời tự nhiên".
export const UNNATURAL = [
  { en: "Hello. I am fine, thank you. And you?", why: "Giống sách giáo khoa, quá cứng khi nhắn tin." },
  { en: "Yes. I agree with your opinion.", why: "Quá trang trọng, nghe như đang họp." },
  { en: "I am very like it.", why: "Sai ngữ pháp: phải là \"I really like it\"." },
  { en: "Dear friend, I accept your invitation.", why: "Như viết thư trang trọng, không phải nhắn tin." },
  { en: "Ok.", why: "Quá cụt, làm câu chuyện dừng lại." },
  { en: "I will consider about it.", why: "Sai: \"consider\" không đi với \"about\"; và nghe xa cách." },
  { en: "Please inform me of the time.", why: "Văn công sở, quá trang trọng với bạn bè." },
  { en: "We can go to play together.", why: "Người lớn dùng \"hang out\", không dùng \"play\"." },
  { en: "It is very delicious food.", why: "Đúng ngữ pháp nhưng cứng; người Mỹ nói \"it's so good\"." },
  { en: "No.", why: "Từ chối cụt lủn, nghe khó chịu." },
];

// Bài học kỹ năng (khoảng 2 phút mỗi bài).
export const LESSONS = [
  {
    id: "raa", emoji: "🔁", title: "Công thức React → Add → Ask",
    sections: [
      { h: "Ý chính", body: "<p>Một câu trả lời tốt thường có 3 phần:</p><ol><li><b>React</b>: phản ứng với điều họ vừa nói (<i>No way!, Aww, That's rough</i>).</li><li><b>Add</b>: thêm một chút thông tin của bạn.</li><li><b>Ask</b>: hỏi lại để câu chuyện tiếp tục.</li></ol>" },
      { h: "Ví dụ", body: "<div class='ex'><div class='them'>Just got back from Vegas!</div><div class='bad'>❌ Nice.</div><div class='good'>✅ <b>No way!</b> <span class='tag'>React</span> I've never been, it's on my list. <span class='tag'>Add</span> Did you win anything? <span class='tag'>Ask</span></div></div><p>\"Nice.\" làm câu chuyện chết luôn. Câu thứ hai cho người kia nhiều thứ để nói tiếp.</p>" },
      { h: "Mẹo", body: "<ul><li>Không cần lúc nào cũng đủ 3 phần. Khi muốn kết thúc, chỉ cần React: <i>haha sounds good, see u!</i></li><li>Phần Add nên ngắn, đừng biến thành bài văn.</li><li>Câu hỏi đơn giản nhất: <i>wbu? / hbu? / you?</i></li></ul>" },
    ],
    check: { q: "Họ nhắn: \"I finally adopted a puppy!\" Câu nào theo đúng React → Add → Ask?", opts: ["Ok cool.", "Omg congrats!! I've always wanted a dog. What's its name?", "I have a cat."], a: 1, why: "Có React (Omg congrats!!), Add (I've always wanted a dog) và Ask (What's its name?)." },
  },
  {
    id: "openclosed", emoji: "❓", title: "Câu hỏi mở và câu hỏi đóng",
    sections: [
      { h: "Khác nhau thế nào?", body: "<p><b>Câu hỏi đóng</b> trả lời được bằng yes/no: <i>Did you like it?</i> → \"yeah\". Xong.</p><p><b>Câu hỏi mở</b> bắt đầu bằng <i>what / how / which / why</i>: <i>What was the best part?</i> → họ phải kể.</p>" },
      { h: "Đổi câu đóng thành câu mở", body: "<ul><li><i>Was it fun?</i> → <b>What did you guys do?</b></li><li><i>Do you like your job?</i> → <b>What's your job like?</b></li><li><i>Is the food good there?</i> → <b>What should I order there?</b></li></ul>" },
      { h: "Khi nào dùng câu đóng?", body: "<p>Khi cần <b>chốt</b> chuyện gì đó: <i>Saturday work for you?</i>, <i>You still down?</i>. Câu đóng nhanh, rõ, hợp để lên kế hoạch.</p>" },
    ],
    check: { q: "Câu nào là câu hỏi mở?", opts: ["Did you go to the beach?", "What did you do at the beach?", "Was the beach crowded?"], a: 1, why: "\"What did you do…\" không trả lời được bằng yes/no, nên người kia sẽ kể nhiều hơn." },
  },
  {
    id: "pullback", emoji: "🧲", title: "Kéo câu chuyện về câu hỏi của bạn",
    sections: [
      { h: "Vấn đề", body: "<p>Bạn hỏi một câu, người kia lại nói sang chuyện khác. Đừng bỏ qua câu hỏi của mình, và cũng đừng nói <i>\"You didn't answer my question\"</i> vì nghe khá gắt.</p>" },
      { h: "Cách làm: React ngắn rồi quay lại", body: "<div class='ex'><div class='me'>are u free saturday?</div><div class='them'>omg did u see the new taco place on 17th st??</div><div class='good'>✅ lol yes it looks so good 😂 <b>but wait</b>, saturday? u free?</div></div>" },
      { h: "Cụm từ hữu ích", body: "<ul><li><b>anyway,</b> … (dù sao thì)</li><li><b>ok but back to</b> saturday 👀</li><li><b>lol but fr,</b> … (haha mà nói thật nè)</li><li><b>so… is that a yes?</b> 😏</li><li><b>circling back</b> on… (dùng ở công sở)</li></ul>" },
    ],
    check: { q: "Bạn hỏi \"wanna get dinner friday?\", họ chỉ kể chuyện con mèo. Câu nào kéo về khéo nhất?", opts: ["You didn't answer me.", "haha ur cat is so cute 😭 ok but friday dinner? 👀", "Ok."], a: 1, why: "React trước (khen con mèo), rồi nhẹ nhàng quay lại câu hỏi bằng \"ok but…\"." },
  },
  {
    id: "callback", emoji: "🪃", title: "Dùng chính lời của họ để đối đáp",
    sections: [
      { h: "Ý chính", body: "<p>Cách đối đáp dí dỏm dễ nhất: <b>lặp lại từ của họ</b> rồi đặt cạnh một sự thật trái ngược. Người Mỹ gọi là <i>callback</i>.</p>" },
      { h: "Ví dụ", body: "<div class='ex'><div class='them'>this pizza is mid</div><div class='good'>✅ <b>mid??</b> you ate 4 slices 💀</div></div><div class='ex'><div class='them'>I'm basically a pro at pickleball now</div><div class='good'>✅ a <b>\"pro\"</b> who missed every serve? 😏</div></div><div class='ex'><div class='them'>I'm saving money this month</div><div class='good'>✅ <b>saving money</b>… says the person holding 2 boba 👀</div></div>" },
      { h: "Công thức và lưu ý", body: "<p><b>[từ của họ]?? / \"từ của họ\"</b> + sự thật trái ngược + emoji (😏 💀 👀).</p><ul><li>Chỉ dùng với người đã thân, đang vui vẻ.</li><li>Chọc chuyện nhỏ (đồ ăn, trò chơi), tránh ngoại hình, tiền bạc thật sự, chuyện nhạy cảm.</li></ul>" },
    ],
    check: { q: "Bạn bè nhắn: \"I'm never late.\" Câu đối đáp kiểu callback là?", opts: ["Ok good.", "\"never late\"?? you were 40 min late yesterday 💀", "I am also not late."], a: 1, why: "Lặp lại chính từ của họ (\"never late\") rồi đưa ra sự thật trái ngược." },
  },
  {
    id: "emoji", emoji: "😏", title: "Emoji: ý nghĩa và khi nào dùng",
    sections: [
      { h: "6 emoji hay gặp", body: "<table class='emo'><tr><td>😏</td><td><b>Nhếch mép</b>: tự tin, chọc ghẹo, đôi khi tán tỉnh. <i>we'll see 😏</i>. Cẩn thận khi nhắn với đồng nghiệp hay người mới quen.</td></tr><tr><td>😌</td><td><b>Mãn nguyện</b>: \"biết mà\", tự hào nhẹ. <i>told you the pho was good 😌</i></td></tr><tr><td>🙈</td><td><b>Ngại, xấu hổ dễ thương</b>. <i>oops wrong chat 🙈</i></td></tr><tr><td>👀</td><td><b>Tò mò, hóng</b>: \"kể đi\", \"để ý nha\". <i>so who's coming 👀</i></td></tr><tr><td>💀</td><td><b>\"Chết cười\"</b>: cười quá trời. KHÔNG phải buồn. <i>LMAO 💀</i></td></tr><tr><td>😭</td><td>Gen Z dùng cho <b>cười quá, xúc động, thèm quá</b>, không nhất thiết là buồn. <i>this is so cute 😭</i></td></tr></table>" },
      { h: "Bẫy cần tránh", body: "<ul><li><b>🙂</b> với Gen Z thường nghe như đang <i>gượng cười, hơi khó chịu</i>.</li><li><b>👍</b> một mình có thể bị thấy hơi lạnh lùng với người trẻ; với đồng nghiệp lớn tuổi thì bình thường.</li><li><b>\"k.\"</b> hoặc chấm câu cuối tin ngắn (<i>ok.</i>) có thể nghe như đang giận.</li><li>Người lớn tuổi (như Linda) dùng emoji theo nghĩa đen: 😭 = buồn thật.</li></ul>" },
    ],
    check: { q: "Mia nhắn \"LMAOOO 💀\". Ý cô ấy là gì?", opts: ["Cô ấy đang buồn", "Cô ấy cười quá trời", "Cô ấy đang giận"], a: 1, why: "💀 = \"chết cười\", đi với LMAO nghĩa là thấy rất buồn cười." },
  },
  {
    id: "scam", emoji: "🚩", title: "Nhận diện tài khoản lừa đảo trong DM",
    sections: [
      { h: "Dấu hiệu cờ đỏ 🚩", body: "<ul><li><b>Né câu hỏi</b>: hỏi gì cũng trả lời chung chung, không bao giờ nói cụ thể mình ở đâu, làm gì.</li><li><b>Tán tỉnh quá nhanh</b>: mới nhắn vài câu đã <i>\"I feel a real connection\"</i>, <i>\"you're my soulmate\"</i>.</li><li><b>Gửi link</b>: <i>\"check this out\"</i>, link lạ, link \"xác minh tài khoản\".</li><li><b>Nhắc tới tiền</b>: đầu tư crypto, \"cơ hội kiếm tiền\", nhờ mua gift card, vay tiền vì chuyện khẩn cấp.</li><li><b>Rủ chuyển app</b>: <i>\"let's talk on WhatsApp / Telegram\"</i> rất sớm.</li><li>Không chịu video call, ảnh đẹp như người mẫu, ngữ pháp kỳ lạ.</li></ul>" },
      { h: "Ví dụ một đoạn chat đáng ngờ", body: "<div class='ex'><div class='them'>hi dear, you have a beautiful smile 😊</div><div class='me'>haha thanks, do we know each other?</div><div class='them'>I feel we are destined to meet 💕 🚩 <span class='tag'>né câu hỏi + tán tỉnh nhanh</span></div><div class='them'>I am investor in crypto, I can teach you make money 🚩 <span class='tag'>tiền</span></div><div class='them'>add me on WhatsApp it is more private 🚩 <span class='tag'>chuyển app</span></div></div>" },
      { h: "Cách phản hồi", body: "<ul><li><i>\"Let's video chat first 😊\"</i>: lừa đảo thường biến mất ngay.</li><li><i>\"I'd rather keep chatting here.\"</i></li><li><i>\"I don't do money stuff online, sorry.\"</i></li><li>Không bấm link, không gửi mã OTP, không chuyển tiền. Block và report.</li></ul><p>Ở Mỹ có nhiều vụ lừa đầu tư (\"pig butchering\") nhắm vào cộng đồng người gốc Á. Cứ nhắc tới tiền là dừng lại.</p>" },
    ],
    check: { q: "Người mới quen trên Instagram nhắn: \"you seem special, let's move to Telegram, I have a crypto tip for you\". Có mấy cờ đỏ?", opts: ["1: chỉ là tán tỉnh", "2: chuyển app và tiền", "3: tán tỉnh nhanh, chuyển app, tiền"], a: 2, why: "Khen kiểu \"you seem special\" quá sớm, rủ sang Telegram, và nhắc tới crypto: đủ 3 cờ đỏ." },
  },
];

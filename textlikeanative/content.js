// Phần dùng chung cho mọi ngôn ngữ. Nội dung riêng của từng tiếng nằm trong langs/.

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
  slang: { vi: "Slang giới trẻ", en: "Youth slang" },
  react: { vi: "Phản ứng", en: "Reactions" },
  banter: { vi: "Đối đáp chọc ghẹo", en: "Banter comebacks" },
  decline: { vi: "Từ chối lịch sự", en: "Polite declines" },
  phrase: { vi: "Cụm từ thường ngày", en: "Casual phrases" },
  emoji: { vi: "Emoji", en: "Emoji" },
};

export const FORMALITY = {
  1: "Rất suồng sã: chỉ dùng với bạn thân",
  2: "Thân mật: bạn bè, người quen",
  3: "Lịch sự / trung tính: dùng được với đồng nghiệp, cấp trên",
};

export const LEVELS = { 1: "Mới bắt đầu", 2: "Trung cấp", 3: "Khá" };

export const WHO = {
  z: "Chủ yếu Gen Z (dưới ~27 tuổi)",
  y: "Gen Z & Millennials (dưới ~40 tuổi)",
  a: "Mọi lứa tuổi",
};

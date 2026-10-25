// Gom các gói ngôn ngữ và dựng sẵn từ điển tra cứu cho từng gói.
import en from "./langs/en.js";
import ja from "./langs/ja.js";
import zh from "./langs/zh.js";
import ko from "./langs/ko.js";

for (const p of [en, ja, zh, ko]) {
  p.lexicon = Object.fromEntries(p.lex.map(([term, cat, vi, ex, f, who, rd]) => [term, { term, cat, vi, ex, f, who, rd }]));
}

export const PACKS = { en, ja, zh, ko };
export const LANG_ORDER = ["en", "ja", "zh", "ko"];

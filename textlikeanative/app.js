import { TONES, CATEGORIES, FORMALITY, WHO, LEVELS } from "./content.js";
import { PACKS, LANG_ORDER } from "./packs.js";
import { offlineFeedback } from "./coach.js";

const FORM_SHORT = { 1: "Rất suồng sã", 2: "Thân mật", 3: "Lịch sự" };
const WHO_SHORT = { z: "Gen Z", y: "Gen Z & Millennials", a: "Mọi lứa tuổi" };
const REPLY_LEVELS = ["An toàn", "Tự nhiên", "Táo bạo"];

// ---------- Lưu trữ ----------
// Cài đặt chung (giao diện, API key, ngày hoạt động) + tiến độ riêng cho từng ngôn ngữ.
const KEY = "textlikeanative.v1";
const DEFAULT = { theme: "auto", apiKey: "", lang: null, activity: {}, langs: {} };
const LANG_DEFAULT = { level: 2, bank: {}, done: {}, convos: 0, quiz: {}, lessons: {}, reviews: 0 };
let S = load();
let P = PACKS[S.lang] || PACKS.en;

function load() {
  let raw;
  try {
    raw = JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch {
    raw = {};
  }
  // Bản cũ chỉ có tiếng Anh: chuyển tiến độ cũ vào langs.en
  if (raw.bank && !raw.langs) {
    const { bank, done, convos, quiz, lessons, reviews, ...rest } = raw;
    raw = { ...rest, lang: "en", langs: { en: { ...LANG_DEFAULT, bank, done: done || {}, convos: convos || 0, quiz: quiz || {}, lessons: lessons || {}, reviews: reviews || 0 } } };
  }
  return { ...DEFAULT, ...raw };
}
function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(S));
  } catch {
    /* chế độ riêng tư: chỉ giữ trong bộ nhớ */
  }
}
function L() {
  if (!S.langs[P.id]) S.langs[P.id] = structuredClone(LANG_DEFAULT);
  return S.langs[P.id];
}
function setLang(id) {
  S.lang = id;
  P = PACKS[id];
  L();
  save();
  bankFilter = "all";
  bankQuery = "";
  $("#lang-btn").textContent = P.name;
}

// ---------- Tiện ích ----------
const $ = (sel, root = document) => root.querySelector(sel);
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = (a, n) => shuffle(a).slice(0, n);

function today(offset = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function markActive() {
  S.activity[today()] = (S.activity[today()] || 0) + 1;
  save();
}
function streak() {
  let n = 0;
  for (let i = S.activity[today()] ? 0 : -1; S.activity[today(i)]; i--) n++;
  return n;
}

// ---------- Theme ----------
function applyTheme() {
  document.documentElement.dataset.theme = S.theme;
  const dark = S.theme === "dark" || (S.theme === "auto" && matchMedia("(prefers-color-scheme: dark)").matches);
  $('meta[name="theme-color"]').content = dark ? "#09090b" : "#fafafa";
}
matchMedia("(prefers-color-scheme: dark)").addEventListener("change", applyTheme);

// ---------- Kho từ ----------
const INTERVALS = [1, 3, 7]; // ngày, theo từng giai đoạn ôn tập

function entry(term) {
  return P.lexicon[term] || L().bank[term]?.data || null;
}
function meet(terms) {
  const bank = L().bank;
  let added = 0;
  for (const t of terms || []) {
    const key = typeof t === "string" ? t : t.term.toLowerCase();
    if (!bank[key]) {
      bank[key] = { added: today(), stage: 0, due: today(INTERVALS[0]) };
      if (typeof t !== "string" && !P.lexicon[key]) {
        bank[key].data = { term: t.term, cat: t.category, vi: t.vi, ex: t.example, f: Number(t.formality), who: t.who, rd: t.reading };
      }
      added++;
    }
  }
  if (added) { save(); toast(`+${added} từ mới vào kho từ`); }
}
function grade(term, ok) {
  const b = L().bank[term];
  if (!b) return;
  b.stage = ok ? Math.min(b.stage + 1, INTERVALS.length) : 0;
  b.due = today(INTERVALS[Math.min(b.stage, INTERVALS.length - 1)]);
  L().reviews++;
  markActive();
}
const dueTerms = () => Object.keys(L().bank).filter((t) => L().bank[t].due <= today() && entry(t));
const learnedCount = () => Object.values(L().bank).filter((b) => b.stage >= INTERVALS.length).length;
const termLabel = (e) => (e.term === "sooo" ? "sooo / yesss / heyyy" : e.term);

// ---------- Toast & sheet ----------
function toast(msg) {
  const el = $("#toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toast.t);
  toast.t = setTimeout(() => el.classList.remove("show"), 1800);
}
function openSheet(html) {
  $("#sheet-body").innerHTML = html;
  $("#sheet").hidden = false;
  requestAnimationFrame(() => $("#sheet").classList.add("open"));
  $("#sheet-body").scrollTop = 0;
}
function closeSheet() {
  $("#sheet").classList.remove("open");
  setTimeout(() => ($("#sheet").hidden = true), 200);
}
$("#sheet").addEventListener("click", (e) => { if (e.target.id === "sheet" || e.target.closest("[data-close]")) closeSheet(); });

// ---------- Điều hướng ----------
let tab = "chat";
document.querySelectorAll("#tabs button").forEach((b) => b.addEventListener("click", () => show(b.dataset.tab)));
function show(t) {
  tab = t;
  document.querySelectorAll("#tabs button").forEach((b) => b.classList.toggle("active", b.dataset.tab === t));
  ({ chat: renderHome, bank: renderBank, quiz: renderQuiz, lessons: renderLessons, progress: renderProgress })[t]();
  $("#main").scrollTop = 0;
}
$("#settings-btn").addEventListener("click", openSettings);
$("#lang-btn").addEventListener("click", openLanguagePicker);

// ---------- Màn hình mở đầu dạng chat ----------
async function runOnboarding() {
  const box = $("#onboard");
  const thread = $("#ob-thread");
  const choices = $("#ob-choices");
  box.hidden = false;
  thread.innerHTML = "";
  choices.innerHTML = "";

  const bot = async (text) => {
    const t = document.createElement("div");
    t.className = "row them";
    t.innerHTML = `<div class="bubble typing"><i></i><i></i><i></i></div>`;
    thread.append(t);
    thread.scrollTop = thread.scrollHeight;
    await sleep(Math.min(1400, 450 + text.length * 12));
    t.innerHTML = `<div class="bubble">${esc(text)}</div>`;
    thread.scrollTop = thread.scrollHeight;
    await sleep(250);
  };
  const ask = (options) => new Promise((resolve) => {
    choices.innerHTML = options.map(([v, label, sub]) => `<button class="choice" data-v="${v}"><b>${esc(label)}</b>${sub ? `<small>${esc(sub)}</small>` : ""}</button>`).join("");
    choices.querySelectorAll(".choice").forEach((b) => b.addEventListener("click", () => {
      const opt = options.find((o) => o[0] === b.dataset.v);
      choices.innerHTML = "";
      const me = document.createElement("div");
      me.className = "row me";
      me.innerHTML = `<div class="bubble">${esc(opt[1])}</div>`;
      thread.append(me);
      thread.scrollTop = thread.scrollHeight;
      resolve(opt[0]);
    }));
  });

  await bot("Chào bạn! Mình là TextLikeANative.");
  await bot("Ở đây bạn luyện nhắn tin như người bản xứ: slang, viết tắt, emoji và cách trả lời cho tự nhiên.");
  await bot("Bạn muốn luyện nhắn tin tiếng gì?");
  const lang = await ask(LANG_ORDER.map((id) => [id, PACKS[id].name, PACKS[id].native]));
  setLang(lang);
  await bot(`${P.name}, hay quá! Trình độ ${P.example} của bạn khoảng nào?`);
  const level = await ask(Object.entries(LEVELS).map(([k, v]) => [k, v]));
  L().level = Number(level);
  save();
  await bot(P.lead);
  await bot(`Chạm vào tin nhắn bất kỳ để xem nghĩa${P.reading ? `, cách đọc (${P.reading.label})` : ""}, slang và gợi ý trả lời. Đổi ngôn ngữ bất cứ lúc nào ở góc trên.`);
  await ask([["go", "Bắt đầu"]]);
  box.hidden = true;
  show("chat");
}

function openLanguagePicker() {
  openSheet(`
    <h2 class="title">Ngôn ngữ</h2>
    <div class="list">${LANG_ORDER.map((id) => { const st = S.langs[id]; const words = st ? Object.keys(st.bank).length : 0; return `
      <button class="item" data-lang="${id}"><span class="info"><b>${esc(PACKS[id].name)} <span class="muted">${esc(PACKS[id].native)}</span></b><small>${st ? `${words} từ · ${st.convos} cuộc trò chuyện` : "Chưa học"}</small></span>${id === P.id ? `<span class="meta-r ok">Đang học</span>` : ""}</button>`; }).join("")}</div>
    <h3>Trình độ ${esc(P.example)}</h3>
    <div class="seg" id="level-seg">${Object.entries(LEVELS).map(([k, v]) => `<button class="${L().level === Number(k) ? "on" : ""}" data-level="${k}">${v}</button>`).join("")}</div>
    <p class="muted small">Trình độ dùng cho chat tự do với AI: mới bắt đầu thì tin ngắn và dễ hơn. Mỗi ngôn ngữ có kho từ, quiz và tiến độ riêng.</p>
    <button class="btn ghost" data-close>Đóng</button>`);
  const body = $("#sheet-body");
  body.querySelectorAll("[data-lang]").forEach((b) => b.addEventListener("click", () => {
    if (b.dataset.lang !== P.id) { setLang(b.dataset.lang); toast(`Đã chuyển sang ${P.name}`); }
    closeSheet();
    show(tab);
  }));
  body.querySelectorAll("[data-level]").forEach((b) => b.addEventListener("click", () => {
    L().level = Number(b.dataset.level);
    save();
    body.querySelectorAll("[data-level]").forEach((x) => x.classList.toggle("on", x === b));
  }));
}

// ---------- Trang chat (danh sách kịch bản) ----------
function renderHome() {
  $("#title").textContent = "TextLikeANative";
  const done = L().done;
  $("#main").innerHTML = `
    <p class="lead">${esc(P.lead)} Chạm vào tin nhắn bất kỳ để xem nghĩa${P.reading ? ", cách đọc" : ""}, slang và gợi ý trả lời.</p>
    <h2>Kịch bản</h2>
    <div class="list">${P.scenarios.map((s) => `
      <button class="item" data-id="${s.id}">
        <span class="avatars">${s.chars.map((c) => avatar(c)).join("")}</span>
        <span class="info"><b>${esc(s.title)}</b><small>${esc(s.desc)}</small></span>
        ${done[s.id] ? `<span class="meta-r ok">Đã xong${done[s.id] > 1 ? ` ×${done[s.id]}` : ""}</span>` : ""}
      </button>`).join("")}
    </div>
    <h2>Chat tự do với AI</h2>
    <button class="feature" id="free-chat"><b>Chọn nhân vật và chủ đề</b><small>Nhân vật trả lời theo đúng những gì bạn viết, kèm nhận xét chi tiết cho từng câu.</small><span class="pill">${S.apiKey ? "Đã có API key" : "Cần API key Claude"}</span></button>
    <h2>Nhân vật</h2>
    <div class="list">${Object.entries(P.chars).map(([id, c]) => `
      <div class="item">${avatar(id)}<span class="info"><b>${esc(charName(c))}, ${c.age}</b><small>${esc(c.role)} · ${esc(c.style)}</small></span></div>`).join("")}
    </div>`;
  $("#main").querySelectorAll(".item[data-id]").forEach((b) => b.addEventListener("click", () => startScripted(P.scenarios.find((s) => s.id === b.dataset.id))));
  $("#free-chat").addEventListener("click", openFreeChatSetup);
}
function charName(c) {
  return c.native && c.native !== c.name ? `${c.name} (${c.native})` : c.name;
}
function avatar(id) {
  const c = P.chars[id];
  const letter = c.native ? [...c.native][0] : c.name[0];
  return `<span class="av" lang="${P.htmlLang}" style="background:color-mix(in srgb, ${c.color} 18%, transparent);color:${c.color}">${esc(letter)}</span>`;
}
function groupAvatar(chars) {
  return `<span class="avatars">${chars.map(avatar).join("")}</span>`;
}

// ---------- Chat engine ----------
let chat = null;

function openChatView(title, chars) {
  $("#chat").hidden = false;
  $("#chat-title").innerHTML = `${chars.length > 1 ? groupAvatar(chars) : avatar(chars[0])}<span><b lang="${P.htmlLang}">${esc(title)}</b><small id="chat-status">${chars.length > 1 ? chars.map((c) => P.chars[c].name).join(", ") : esc(P.chars[chars[0]].role)}</small></span>`;
  $("#thread").innerHTML = "";
  $("#input").value = "";
  $("#input").lang = P.htmlLang;
  setComposer(false);
}
function closeChat() {
  if (chat?.mode === "ai" && chat.userTurns >= 3 && !chat.counted) finishConvo();
  chat = null;
  $("#chat").hidden = true;
  show(tab);
}
$("#chat-back").addEventListener("click", closeChat);

function startScripted(sc) {
  chat = { mode: "script", sc, chars: sc.chars, turn: 0, history: [], userTurns: 0 };
  openChatView(sc.group || charName(P.chars[sc.chars[0]]), sc.chars);
  for (const m of sc.history || []) addBubble({ ...m, text: m.t, ann: m, old: true });
  if (sc.history) addNote("Bạn chưa trả lời tin này. Hai ngày sau…");
  playTurn();
}

async function playTurn() {
  const c = chat;
  const t = c.sc.turns[c.turn];
  setComposer(false);
  for (const m of t.msgs) {
    if (c !== chat) return;
    await typing(m.from, m.t);
    if (c !== chat) return;
    addBubble({ from: m.from, text: m.t, ann: m, replies: t.replies });
    meet(m.s);
  }
  c.replies = t.replies;
  setComposer(true);
}

async function typing(from, text) {
  const el = document.createElement("div");
  el.className = "row them";
  el.innerHTML = `${chat.chars.length > 1 ? avatar(from) : ""}<div class="bubble typing"><i></i><i></i><i></i></div>`;
  $("#thread").append(el);
  scrollDown();
  const st = $("#chat-status");
  const prev = st?.textContent;
  if (st) st.textContent = `${P.chars[from].name} đang nhập...`;
  await sleep(Math.min(3200, 700 + [...text].length * P.typeMs));
  el.remove();
  if (st) st.textContent = prev;
}

function addBubble(m) {
  const me = m.from === "me";
  const thread = $("#thread");
  const last = thread.lastElementChild;
  const group = chat.chars.length > 1 && !me;
  const showName = group && !(last?.dataset.from === m.from);
  const el = document.createElement("div");
  el.className = `row ${me ? "me" : "them"}${m.old ? " old" : ""}`;
  el.dataset.from = m.from;
  el.innerHTML = `${showName ? `<div class="name">${esc(P.chars[m.from].name)}</div>` : ""}
    ${group ? (showName ? avatar(m.from) : `<span class="av-space"></span>`) : ""}
    <div class="bubble" lang="${P.htmlLang}" ${me ? "" : 'role="button" tabindex="0"'}>${esc(m.text)}</div>
    ${m.stamp ? `<div class="stamp">${esc(m.stamp)}</div>` : ""}`;
  if (!me) {
    const b = $(".bubble", el);
    const open = () => explain(m);
    b.addEventListener("click", open);
    b.addEventListener("keydown", (e) => { if (e.key === "Enter") open(); });
  }
  thread.append(el);
  chat.history.push({ from: m.from, text: m.text });
  chat.lastThem = me ? chat.lastThem : m;
  scrollDown();
  return el;
}
function addNote(text) {
  const el = document.createElement("div");
  el.className = "note";
  el.textContent = text;
  $("#thread").append(el);
  scrollDown();
  return el;
}
function scrollDown() {
  const t = $("#thread");
  t.scrollTop = t.scrollHeight;
}
function setComposer(on) {
  $("#input").disabled = !on;
  $("#send").disabled = !on;
  $("#hint-btn").disabled = !on;
  $("#input").placeholder = on ? "Nhắn tin" : "";
}

// Giải thích một tin nhắn: dịch, cách đọc, slang, tone, gợi ý trả lời
function explain(m) {
  const a = m.ann || {};
  const terms = (a.s || []).map((t) => entry(t)).filter(Boolean).concat((a.slang || []).map((x) => ({ term: x.term, cat: x.category, vi: x.vi, ex: x.example, f: Number(x.formality), who: x.who, rd: x.reading })));
  const tone = TONES[a.tone];
  const replies = m.replies || [];
  openSheet(`
    <div class="sheet-msg"><div class="bubble" lang="${P.htmlLang}">${esc(m.text)}</div></div>
    ${tone ? `<div class="tag-line"><span class="pill tone-${a.tone}">Tone: ${tone.vi} (${a.tone})</span></div>` : ""}
    ${P.reading && a.r ? `<h3>Cách đọc (${esc(P.reading.label)})</h3><p class="reading">${esc(a.r)}</p>` : ""}
    <h3>Nghĩa</h3><p class="vi">${esc(a.vi || "")}</p>
    ${terms.length ? `<h3>Slang và viết tắt</h3><div class="terms">${terms.map((e) => termCard(e)).join("")}</div>` : ""}
    ${replies.length ? `<h3>Gợi ý trả lời</h3><div class="replies">${replies.map((r, i) => { const lv = Number(r.level) || i + 1; return `
      <button class="reply" data-i="${i}"><span class="lvl lvl-${lv}">${REPLY_LEVELS[lv - 1] || ""}</span><b lang="${P.htmlLang}">${esc(r.en)}</b>${P.reading && r.r ? `<span class="reading sm">${esc(r.r)}</span>` : ""}<small>${esc(r.vi)}</small></button>`; }).join("")}</div>
      <p class="muted small">Chạm để chép vào ô nhắn tin. Bạn có thể sửa lại trước khi gửi.</p>` : ""}
    <button class="btn ghost" data-close>Đóng</button>`);
  $("#sheet-body").querySelectorAll(".reply").forEach((b) => b.addEventListener("click", () => {
    const r = replies[b.dataset.i];
    meet(r.s);
    $("#input").value = r.en;
    closeSheet();
    if (!$("#input").disabled) $("#input").focus();
  }));
}
function termCard(e, extra = "") {
  return `<div class="term"><div class="t"><b lang="${P.htmlLang}">${esc(termLabel(e))}</b><span class="pill">${CATEGORIES[e.cat]?.vi ?? ""}</span></div>
    ${P.reading && e.rd ? `<div class="reading sm">${esc(e.rd)}</div>` : ""}
    <div>${esc(e.vi)}</div>
    <div class="ex" lang="${P.htmlLang}">"${esc(e.ex)}"</div>
    <div class="meta"><span class="pill">${esc(FORM_SHORT[e.f] || "")}</span><span class="pill">${esc(WHO_SHORT[e.who] || "")}</span>${extra}</div></div>`;
}

$("#hint-btn").addEventListener("click", () => chat?.lastThem && explain({ ...chat.lastThem, replies: chat.replies }));
$("#composer").addEventListener("submit", (e) => { e.preventDefault(); send(); });

async function send() {
  const text = $("#input").value.trim();
  if (!text || !chat) return;
  const c = chat;
  $("#input").value = "";
  setComposer(false);
  const historyBefore = c.history.slice();
  const row = addBubble({ from: "me", text });
  c.userTurns++;
  markActive();
  const isLast = c.mode === "script" && c.turn === c.sc.turns.length - 1;
  const fbP = getFeedback(c, historyBefore, text, isLast).then((fb) => attachFeedback(row, fb)).catch(() => {});

  if (c.mode === "script") {
    c.turn++;
    if (c.turn >= c.sc.turns.length) {
      await fbP;
      if (c === chat) finishConvo();
      return;
    }
    await sleep(600);
    if (c === chat) playTurn();
  } else {
    await aiTurn();
  }
}

async function getFeedback(c, history, text, isLast) {
  const offline = () => offlineFeedback(text, c.replies || [], isLast, P.id);
  if (S.apiKey) {
    const { feedbackOnReply } = await import("./ai.js");
    try {
      return await feedbackOnReply(S.apiKey, { pack: P, level: L().level, chars: c.chars, history, reply: text });
    } catch (e) {
      return { ...offline(), error: e.message };
    }
  }
  return offline();
}

function attachFeedback(row, fb) {
  const chip = document.createElement("button");
  const score = Number(fb.score);
  chip.className = `fb-chip s${score}`;
  chip.innerHTML = `<span>Tự nhiên ${score}/5 · ${fb.noGrammar ? "Chưa kiểm tra ngữ pháp" : fb.grammar.length ? `${fb.grammar.length} lỗi` : "Không lỗi"} · Xem nhận xét</span>`;
  chip.addEventListener("click", () => showFeedback(fb, $(".bubble", row).textContent));
  row.append(chip);
  scrollDown();
}

function showFeedback(fb, text) {
  const score = Number(fb.score);
  openSheet(`
    <div class="sheet-msg me"><div class="bubble" lang="${P.htmlLang}">${esc(text)}</div></div>
    <h3>Ngữ pháp</h3>
    ${fb.noGrammar ? `<p class="muted">Kiểm tra ngữ pháp ${esc(P.example)} cần API key Claude (trong Cài đặt).</p>` : fb.grammar.length ? fb.grammar.map((g) => `<div class="gfix"><div lang="${P.htmlLang}"><span class="w">${esc(g.wrong)}</span><span class="arrow">→</span><span class="r">${esc(g.right)}</span></div><small>${esc(g.why)}</small></div>`).join("") : `<p>Không thấy lỗi ngữ pháp.</p>`}
    ${fb.fixed ? `<p class="small">Câu đã sửa: <b>${esc(fb.fixed)}</b></p>` : ""}
    <h3>Người bản xứ sẽ nói</h3>
    <div class="native"><b lang="${P.htmlLang}">${esc(fb.native)}</b>${P.reading && fb.native_reading ? `<span class="reading sm">${esc(fb.native_reading)}</span>` : ""}${fb.native_vi ? `<small>${esc(fb.native_vi)}</small>` : ""}</div>
    <h3>Độ tự nhiên</h3>
    <div class="meter s${score}"><div class="num">${score}<span>/5</span></div><div class="segs">${[1, 2, 3, 4, 5].map((k) => `<i class="${k <= score ? "on" : ""}"></i>`).join("")}</div></div>
    <p>${esc(fb.score_why)}</p>
    <h3>Giữ câu chuyện tiếp tục</h3>
    <div class="raa"><span class="${fb.react ? "y" : "n"}">React</span><span class="${fb.add ? "y" : "n"}">Add</span><span class="${fb.ask ? "y" : "n"}">Ask</span></div>
    <p>${esc(fb.flow_tip)}</p>
    ${fb.offline ? `<p class="muted small">${fb.error ? `${esc(fb.error)} Đang dùng nhận xét cơ bản (offline).` : "Nhận xét cơ bản (offline). Thêm API key Claude trong Cài đặt để được nhận xét chi tiết bằng AI."}</p>` : ""}
    <button class="btn ghost" data-close>Đóng</button>`);
}

function finishConvo() {
  const c = chat;
  c.counted = true;
  L().convos++;
  if (c.mode === "script") L().done[c.sc.id] = (L().done[c.sc.id] || 0) + 1;
  markActive();
  const el = addNote("");
  el.className = "done";
  el.innerHTML = `<b>Hoàn thành cuộc trò chuyện</b><small class="muted">Chạm vào dòng nhận xét dưới mỗi tin của bạn để xem lại.</small>
    <div class="row-btns">${c.mode === "script" ? `<button class="btn" id="again">Làm lại</button>` : ""}<button class="btn ghost" id="leave">Về trang chính</button></div>`;
  $("#again")?.addEventListener("click", () => startScripted(c.sc));
  $("#leave").addEventListener("click", closeChat);
  setComposer(false);
  scrollDown();
}

// ---------- Chat tự do với AI ----------
function openFreeChatSetup() {
  if (!S.apiKey) {
    openSettings();
    toast("Thêm API key Claude để chat tự do");
    return;
  }
  let sel = Object.keys(P.chars)[0];
  openSheet(`
    <h2 class="title">Chat tự do</h2>
    <h3>Nhân vật</h3>
    <div class="pick-chars">${Object.entries(P.chars).map(([id, c]) => `<button class="pc${id === sel ? " on" : ""}" data-id="${id}">${avatar(id)}<b>${esc(c.name)}</b><small>${esc(c.role)}</small></button>`).join("")}
      <button class="pc" data-id="group">${groupAvatar(P.group)}<b>Nhóm chat</b><small>${P.group.map((g) => esc(P.chars[g].name)).join(", ")}</small></button></div>
    <h3>Chủ đề</h3>
    <div class="topics">${P.scenarios.map((s, i) => `<label><input type="radio" name="topic" value="${esc(s.en)}" ${i === 0 ? "checked" : ""}> ${esc(s.title)}</label>`).join("")}
      <label><input type="radio" name="topic" value="custom"> Tự nhập chủ đề</label>
      <input id="custom-topic" class="field" placeholder="vd: rủ nhau đi Big Bear cuối tuần" hidden></div>
    <button class="btn accent wide" id="go">Bắt đầu chat</button>
    <p class="muted small">Trình độ: ${LEVELS[L().level]}. Mỗi lượt gọi Claude (claude-opus-5-5) bằng API key của bạn và tính phí vào tài khoản của bạn.</p>`);
  const body = $("#sheet-body");
  body.querySelectorAll(".pc").forEach((b) => b.addEventListener("click", () => {
    sel = b.dataset.id;
    body.querySelectorAll(".pc").forEach((x) => x.classList.toggle("on", x === b));
  }));
  body.querySelectorAll('input[name="topic"]').forEach((r) => r.addEventListener("change", () => ($("#custom-topic").hidden = r.value !== "custom" || !r.checked)));
  $("#go").addEventListener("click", () => {
    let topic = body.querySelector('input[name="topic"]:checked').value;
    if (topic === "custom") topic = $("#custom-topic").value.trim() || "casual chat";
    closeSheet();
    startAI(sel === "group" ? P.group : [sel], topic);
  });
}

async function startAI(chars, topic) {
  chat = { mode: "ai", chars, topic, history: [], userTurns: 0, replies: [] };
  openChatView(chars.length > 1 ? "Nhóm chat" : charName(P.chars[chars[0]]), chars);
  addNote(`Chủ đề: ${topic} · Bấm Quay lại để kết thúc`);
  await aiTurn();
}

async function aiTurn() {
  const c = chat;
  setComposer(false);
  const wait = document.createElement("div");
  wait.className = "row them";
  wait.innerHTML = `<div class="bubble typing"><i></i><i></i><i></i></div>`;
  $("#thread").append(wait);
  scrollDown();
  try {
    const { nextCharacterTurn } = await import("./ai.js");
    const out = await nextCharacterTurn(S.apiKey, { pack: P, level: L().level, chars: c.chars, topic: c.topic, history: c.history });
    wait.remove();
    if (c !== chat) return;
    c.replies = out.replies.map((r) => ({ ...r, r: r.reading }));
    for (const m of out.messages) {
      await typing(m.from, m.text);
      if (c !== chat) return;
      addBubble({ from: m.from, text: m.text, ann: { vi: m.vi, r: m.reading, tone: m.tone, slang: m.slang }, replies: c.replies });
      meet(m.slang);
    }
    setComposer(true);
  } catch (e) {
    wait.remove();
    if (c !== chat) return;
    const n = addNote(`${e.message} `);
    const retry = document.createElement("button");
    retry.className = "btn sm";
    retry.textContent = "Thử lại";
    retry.addEventListener("click", () => { n.remove(); aiTurn(); });
    n.append(retry);
  }
}

// ---------- Kho từ & flashcard ----------
let bankFilter = "all";
let bankQuery = "";
function renderBank() {
  $("#title").textContent = "Kho từ";
  const bank = L().bank;
  const terms = Object.keys(bank).filter((t) => entry(t)).sort((a, b) => bank[b].added.localeCompare(bank[a].added) || a.localeCompare(b));
  const due = dueTerms();
  const list = terms.filter((t) => { const e = entry(t); return (bankFilter === "all" || e.cat === bankFilter) && (!bankQuery || `${t} ${e.vi} ${e.rd || ""}`.toLowerCase().includes(bankQuery)); });
  $("#main").innerHTML = `
    <div class="stats"><div class="stat"><b>${terms.length}</b><small>đã gặp</small></div><div class="stat"><b>${learnedCount()}</b><small>đã thuộc</small></div><div class="stat"><b>${due.length}</b><small>cần ôn</small></div></div>
    <button class="btn accent wide" id="review" ${due.length ? "" : "disabled"}>Ôn thẻ đến hạn (${due.length})</button>
    ${terms.length ? `<button class="btn ghost wide" id="review-all" style="margin-top:8px">Ôn tất cả ${terms.length} từ</button>` : ""}
    <input class="field" id="q" placeholder="Tìm từ" value="${esc(bankQuery)}">
    <div class="chips">${[["all", "Tất cả"], ...Object.entries(CATEGORIES).map(([k, v]) => [k, v.vi])].map(([k, v]) => `<button class="chip${bankFilter === k ? " on" : ""}" data-k="${k}">${esc(v)}</button>`).join("")}</div>
    ${terms.length ? "" : `<p class="empty">Kho từ ${esc(P.example)} còn trống. Mở một kịch bản chat, từ mới sẽ tự động được lưu vào đây.</p>`}
    <div class="terms">${list.map((t) => { const b = bank[t]; return termCard(entry(t), `<span class="pill">${b.stage >= INTERVALS.length ? "Đã thuộc" : `Giai đoạn ${b.stage + 1}/${INTERVALS.length}`} · ôn ${b.due <= today() ? "hôm nay" : b.due}</span>`); }).join("")}</div>`;
  $("#review")?.addEventListener("click", () => flashcards(shuffle(due)));
  $("#review-all")?.addEventListener("click", () => flashcards(shuffle(terms), true));
  $("#q").addEventListener("input", (e) => { bankQuery = e.target.value.toLowerCase(); const pos = e.target.selectionStart; renderBank(); const q = $("#q"); q.focus(); q.setSelectionRange(pos, pos); });
  $("#main").querySelectorAll(".chip").forEach((b) => b.addEventListener("click", () => { bankFilter = b.dataset.k; renderBank(); }));
}

function flashcards(queue, practice = false) {
  let i = 0, right = 0;
  const step = () => {
    if (i >= queue.length) {
      save();
      openSheet(`<div class="center"><h3>Đã ôn xong</h3><div class="result-num">${right}<span>/${queue.length}</span></div><p class="muted">${practice ? "Số thẻ bạn nhớ." : "Thẻ đã nhớ sẽ quay lại sau 1, 3 rồi 7 ngày."}</p><button class="btn wide" data-close>Đóng</button></div>`);
      if (tab === "bank") renderBank();
      return;
    }
    const t = queue[i], e = entry(t);
    openSheet(`
      <div class="fc-progress"><span>Thẻ ${i + 1} / ${queue.length}</span><span>${esc(CATEGORIES[e.cat]?.vi)}</span></div>
      <div class="track"><i style="width:${(i / queue.length) * 100}%"></i></div>
      <div class="flash" id="flash"><div class="front"><b lang="${P.htmlLang}">${esc(termLabel(e))}</b><div class="ex" lang="${P.htmlLang}">"${esc(e.ex)}"</div><span class="hint">Chạm để lật thẻ</span></div>
        <div class="back" hidden>${P.reading && e.rd ? `<div class="reading">${esc(e.rd)}</div>` : ""}<b>${esc(e.vi)}</b><small>${esc(FORMALITY[e.f])}</small><small>${esc(WHO[e.who])}</small></div></div>
      <div class="row-btns" id="grade" hidden><button class="btn bad" data-ok="0">Quên</button><button class="btn good" data-ok="1">Nhớ</button></div>
      <button class="btn ghost" data-close>Dừng</button>`);
    $("#flash").addEventListener("click", () => { $("#flash .back").hidden = false; $("#grade").hidden = false; });
    $("#grade").querySelectorAll("button").forEach((b) => b.addEventListener("click", () => {
      const ok = b.dataset.ok === "1";
      if (ok) right++;
      if (!practice) grade(t, ok); else markActive();
      i++;
      step();
    }));
  };
  step();
}

// ---------- Quiz hằng ngày ----------
function allMessages() {
  return P.scenarios.flatMap((s) => s.turns.flatMap((t) => t.msgs.map((m) => ({ ...m, scenario: s }))));
}
function buildQuiz() {
  const msgs = allMessages();
  const qs = [];
  for (const m of pick(msgs, 4)) {
    const wrong = pick(msgs.filter((x) => x.vi !== m.vi), 2).map((x) => x.vi);
    const opts = shuffle([m.vi, ...wrong]);
    qs.push({ type: "Dịch tin nhắn", prompt: `<div class="qbubble" lang="${P.htmlLang}">${esc(m.t)}</div><p>Tin này nghĩa là gì?</p>`, opts, a: opts.indexOf(m.vi), why: `${m.r ? `Cách đọc: ${m.r}. ` : ""}Từ ${P.chars[m.from].name} trong kịch bản “${m.scenario.title}”.` });
  }
  const turns = P.scenarios.flatMap((s) => s.turns);
  for (const t of pick(turns, 3)) {
    const good = pick(t.replies, 1)[0];
    const bad = pick(P.unnatural, 2);
    const opts = shuffle([good.en, ...bad.map((b) => b.en)]);
    qs.push({ type: "Chọn câu trả lời tự nhiên", prompt: `${t.msgs.map((m) => `<div class="qbubble" lang="${P.htmlLang}">${esc(m.t)}</div>`).join("")}<p>Câu trả lời nào tự nhiên nhất?</p>`, opts, a: opts.indexOf(good.en), why: `“${good.en}”: ${good.vi}. ${bad.map((b) => `“${b.en}”: ${b.why}`).join(" ")}` });
  }
  const abbrs = Object.keys(P.lexicon).filter((t) => P.lexicon[t].cat === "abbr");
  const seen = Object.keys(L().bank).filter((t) => abbrs.includes(t));
  const pool = [...new Set([...pick(seen, 3), ...pick(abbrs, 3)])].slice(0, 3);
  for (const t of pool) {
    const e = P.lexicon[t];
    const wrong = pick(abbrs.filter((x) => x !== t), 2).map((x) => P.lexicon[x].vi);
    const opts = shuffle([e.vi, ...wrong]);
    qs.push({ type: "Giải mã viết tắt", prompt: `<div class="qbig" lang="${P.htmlLang}">${esc(t)}</div><p lang="${P.htmlLang}">“${esc(e.ex)}”</p>`, opts, a: opts.indexOf(e.vi), why: `${t}${e.rd ? ` (${e.rd})` : ""}: ${e.vi}`, term: t });
  }
  return shuffle(qs);
}

function renderQuiz() {
  $("#title").textContent = "Quiz hằng ngày";
  const quiz = L().quiz;
  const r = quiz[today()];
  const past = Object.entries(quiz).sort((a, b) => b[0].localeCompare(a[0])).slice(0, 7);
  $("#main").innerHTML = `
    <div class="hero"><div class="k">Hôm nay · ${esc(P.name)}</div><div class="h">10 câu hỏi</div><p>Dịch tin nhắn, chọn câu trả lời tự nhiên, giải mã viết tắt.</p>
      ${r ? `<p style="margin-top:10px">Điểm cao nhất hôm nay: <b>${r.best}/10</b></p>` : ""}
      <button class="btn accent wide" id="start">${r ? "Làm lại" : "Bắt đầu"}</button></div>
    ${past.length ? `<h2>7 ngày gần đây</h2><div class="list">${past.map(([d, v]) => `<div class="kv"><span>${d}</span><b>${v.best}/10</b></div>`).join("")}</div>` : ""}`;
  $("#start").addEventListener("click", () => runQuiz(buildQuiz()));
}

function runQuiz(qs) {
  let i = 0, score = 0;
  const step = () => {
    if (i >= qs.length) {
      const d = today(), quiz = L().quiz;
      quiz[d] = { best: Math.max(score, quiz[d]?.best || 0), last: score };
      markActive();
      openSheet(`<div class="center"><h3>Kết quả</h3><div class="result-num">${score}<span>/${qs.length}</span></div><p class="muted">${score >= 8 ? "Rất tốt! Bạn nhắn tin như người bản xứ rồi." : "Tiếp tục luyện chat và ôn thẻ nhé."}</p><button class="btn wide" data-close>Đóng</button></div>`);
      if (tab === "quiz") renderQuiz();
      return;
    }
    const q = qs[i];
    openSheet(`
      <div class="fc-progress"><span>Câu ${i + 1} / ${qs.length}</span><span>${esc(q.type)}</span></div>
      <div class="track"><i style="width:${(i / qs.length) * 100}%"></i></div>
      <div class="qprompt">${q.prompt}</div>
      <div class="opts">${q.opts.map((o, k) => `<button class="opt" data-k="${k}" lang="${q.type === "Chọn câu trả lời tự nhiên" ? P.htmlLang : "vi"}">${esc(o)}</button>`).join("")}</div>
      <div id="why" hidden></div>
      <button class="btn wide" id="next" hidden>${i + 1 < qs.length ? "Câu tiếp theo" : "Xem kết quả"}</button>`);
    $("#sheet-body").querySelectorAll(".opt").forEach((b) => b.addEventListener("click", () => {
      const k = Number(b.dataset.k);
      const ok = k === q.a;
      if (ok) score++;
      if (q.term) meet([q.term]);
      $("#sheet-body").querySelectorAll(".opt").forEach((x, j) => { x.disabled = true; x.classList.toggle("right", j === q.a); x.classList.toggle("wrong", j === k && !ok); });
      $("#why").hidden = false;
      $("#why").innerHTML = `<p class="${ok ? "ok" : "no"}">${ok ? "Chính xác" : "Chưa đúng"}</p><p class="small">${esc(q.why)}</p>`;
      $("#next").hidden = false;
    }));
    $("#next").addEventListener("click", () => { i++; step(); });
  };
  step();
}

// ---------- Bài học ----------
function renderLessons() {
  $("#title").textContent = "Bài học";
  const done = L().lessons;
  $("#main").innerHTML = `<p class="lead">Mỗi bài khoảng 2 phút. Giải thích bằng tiếng Việt, ví dụ bằng ${esc(P.example)}.</p>
    <h2>Kỹ năng nhắn tin</h2>
    <div class="list">${P.lessons.map((l, i) => `<button class="item lesson" data-i="${i}"><span class="av" style="background:var(--surface-2);color:var(--muted)">${String(i + 1).padStart(2, "0")}</span><span class="info"><b>${esc(l.title)}</b><small>${l.sections.map((s) => esc(s.h)).join(" · ")}</small></span>${done[l.id] ? `<span class="meta-r ok">Đã học</span>` : ""}</button>`).join("")}</div>`;
  $("#main").querySelectorAll(".lesson").forEach((b) => b.addEventListener("click", () => openLesson(P.lessons[b.dataset.i])));
}
function openLesson(l) {
  openSheet(`
    <h2 class="title">${esc(l.title)}</h2>
    <div class="lesson-body">${l.sections.map((s) => `<h3>${esc(s.h)}</h3>${s.body}`).join("")}</div>
    <h3>Kiểm tra nhanh</h3><p>${esc(l.check.q)}</p>
    <div class="opts">${l.check.opts.map((o, k) => `<button class="opt" data-k="${k}">${esc(o)}</button>`).join("")}</div>
    <div id="why" hidden></div>
    <button class="btn ghost" data-close>Đóng</button>`);
  $("#sheet-body").querySelectorAll(".opt").forEach((b) => b.addEventListener("click", () => {
    const k = Number(b.dataset.k), ok = k === l.check.a;
    $("#sheet-body").querySelectorAll(".opt").forEach((x, j) => { x.disabled = true; x.classList.toggle("right", j === l.check.a); x.classList.toggle("wrong", j === k && !ok); });
    $("#why").hidden = false;
    $("#why").innerHTML = `<p class="${ok ? "ok" : "no"}">${ok ? "Chính xác" : "Chưa đúng"}</p><p class="small">${esc(l.check.why)}</p>`;
    if (!L().lessons[l.id]) { L().lessons[l.id] = today(); markActive(); }
    if (tab === "lessons") renderLessons();
  }));
}

// ---------- Tiến độ ----------
function renderProgress() {
  $("#title").textContent = "Tiến độ";
  const st = L();
  const days = Array.from({ length: 14 }, (_, k) => today(k - 13));
  const words = Object.keys(st.bank).filter((t) => entry(t)).length;
  const byCat = Object.keys(CATEGORIES).map((c) => [c, Object.keys(st.bank).filter((t) => entry(t)?.cat === c).length, Object.values(P.lexicon).filter((e) => e.cat === c).length]).filter(([, n, total]) => total || n);
  const others = LANG_ORDER.filter((id) => id !== P.id && S.langs[id]);
  $("#main").innerHTML = `
    <p class="lead">${esc(P.name)} · trình độ ${esc(LEVELS[st.level])}</p>
    <h2>Tổng quan</h2>
    <div class="stats">
      <div class="stat"><b>${streak()}</b><small>ngày liên tiếp</small></div>
      <div class="stat"><b>${words}</b><small>từ đã gặp</small></div>
      <div class="stat"><b>${learnedCount()}</b><small>từ đã thuộc</small></div>
      <div class="stat"><b>${st.convos}</b><small>cuộc trò chuyện</small></div>
      <div class="stat"><b>${Object.keys(st.quiz).length}</b><small>ngày làm quiz</small></div>
      <div class="stat"><b>${Object.keys(st.lessons).length}/${P.lessons.length}</b><small>bài học</small></div>
    </div>
    <h2>14 ngày qua (mọi ngôn ngữ)</h2>
    <div class="days">${days.map((d) => `<span class="${S.activity[d] ? "on" : ""}${d === today() ? " today" : ""}" title="${d}">${Number(d.slice(8))}</span>`).join("")}</div>
    <h2>Từ vựng theo nhóm</h2>
    <div class="bars">${byCat.map(([c, n, total]) => `<div class="bar"><span>${esc(CATEGORIES[c].vi)}</span><b>${n}/${total}</b><div><i style="width:${Math.min(100, (n / Math.max(1, total)) * 100)}%"></i></div></div>`).join("")}</div>
    <h2>Kịch bản</h2>
    <div class="list">${P.scenarios.map((s) => `<div class="kv"><span>${esc(s.title)}</span>${st.done[s.id] ? `<b class="ok">Đã xong${st.done[s.id] > 1 ? ` ×${st.done[s.id]}` : ""}</b>` : `<span class="muted">Chưa học</span>`}</div>`).join("")}</div>
    ${others.length ? `<h2>Ngôn ngữ khác</h2><div class="list">${others.map((id) => `<div class="kv"><span>${esc(PACKS[id].name)}</span><span class="muted">${Object.keys(S.langs[id].bank).length} từ · ${S.langs[id].convos} cuộc trò chuyện</span></div>`).join("")}</div>` : ""}
    <p class="muted small" style="margin-top:16px">Tiến độ được lưu trong trình duyệt này.</p>`;
}

// ---------- Cài đặt ----------
function openSettings() {
  openSheet(`
    <h2 class="title">Cài đặt</h2>
    <h3>Ngôn ngữ đang học</h3>
    <button class="btn ghost wide" id="pick-lang" style="margin-top:0">${esc(P.name)} · ${esc(LEVELS[L().level])} · Đổi</button>
    <h3>Giao diện</h3>
    <div class="seg">${[["auto", "Tự động"], ["light", "Sáng"], ["dark", "Tối"]].map(([k, v]) => `<button class="${S.theme === k ? "on" : ""}" data-theme="${k}">${v}</button>`).join("")}</div>
    <h3>API key Claude (không bắt buộc)</h3>
    <p class="small">Các kịch bản có sẵn chạy không cần key. Có key thì bạn được <b>chat tự do với AI</b> và nhận <b>nhận xét AI</b> chi tiết cho từng câu (kể cả ngữ pháp tiếng Nhật, Trung, Hàn). Lấy key tại <a href="https://platform.claude.com/settings/keys" target="_blank" rel="noopener">platform.claude.com</a>.</p>
    <input class="field" id="key" type="password" autocomplete="off" placeholder="sk-ant-…" value="${esc(S.apiKey)}">
    <p class="muted small">Key chỉ lưu trong trình duyệt của bạn và được gửi thẳng tới api.anthropic.com. Đừng dùng tính năng này trên máy dùng chung.</p>
    <div class="row-btns"><button class="btn accent" id="save-key">Lưu key</button>${S.apiKey ? `<button class="btn ghost" id="del-key">Xóa key</button>` : ""}</div>
    <h3>Dữ liệu</h3>
    <div class="row-btns"><button class="btn ghost" id="export">Xuất tiến độ</button><button class="btn bad" id="reset">Xóa tiến độ ${esc(P.example)}</button></div>
    <button class="btn ghost" data-close>Đóng</button>`);
  const body = $("#sheet-body");
  $("#pick-lang").addEventListener("click", openLanguagePicker);
  body.querySelectorAll("[data-theme]").forEach((b) => b.addEventListener("click", () => { S.theme = b.dataset.theme; save(); applyTheme(); body.querySelectorAll("[data-theme]").forEach((x) => x.classList.toggle("on", x === b)); }));
  $("#save-key").addEventListener("click", () => { S.apiKey = $("#key").value.trim(); save(); toast(S.apiKey ? "Đã lưu key" : "Đã xóa key"); closeSheet(); if (tab === "chat" && !chat) renderHome(); });
  $("#del-key")?.addEventListener("click", () => { S.apiKey = ""; save(); toast("Đã xóa key"); closeSheet(); if (tab === "chat" && !chat) renderHome(); });
  $("#export").addEventListener("click", () => {
    const { apiKey, ...data } = S;
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }));
    a.download = `textlikeanative-${today()}.json`;
    a.click();
  });
  $("#reset").addEventListener("click", () => {
    if (!confirm(`Xóa kho từ, quiz và tiến độ ${P.example}? (Các ngôn ngữ khác, API key và giao diện được giữ lại)`)) return;
    S.langs[P.id] = { ...structuredClone(LANG_DEFAULT), level: L().level };
    save();
    closeSheet();
    show(tab);
  });
}

applyTheme();
if (S.lang && PACKS[S.lang]) {
  setLang(S.lang);
  show("chat");
} else {
  runOnboarding();
}

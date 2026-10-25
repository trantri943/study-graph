import { TONES, CATEGORIES, FORMALITY, WHO, CHARACTERS, LEXICON, SCENARIOS, UNNATURAL, LESSONS } from "./content.js";
import { offlineFeedback } from "./coach.js";

// ---------- Lưu trữ ----------
const KEY = "textlikeanative.v1";
const DEFAULT = { theme: "auto", apiKey: "", bank: {}, done: {}, convos: 0, activity: {}, quiz: {}, lessons: {}, reviews: 0 };
let S = load();

function load() {
  try {
    return { ...DEFAULT, ...JSON.parse(localStorage.getItem(KEY) || "{}") };
  } catch {
    return { ...DEFAULT };
  }
}
function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(S));
  } catch {
    /* chế độ riêng tư: chỉ giữ trong bộ nhớ */
  }
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
  $('meta[name="theme-color"]').content = dark ? "#000000" : "#ffffff";
}
matchMedia("(prefers-color-scheme: dark)").addEventListener("change", applyTheme);

// ---------- Kho từ ----------
const INTERVALS = [1, 3, 7]; // ngày, theo từng giai đoạn ôn tập

function entry(term) {
  return LEXICON[term] || S.bank[term]?.data || null;
}
function meet(terms) {
  let added = 0;
  for (const t of terms || []) {
    const key = typeof t === "string" ? t : t.term.toLowerCase();
    if (!S.bank[key]) {
      S.bank[key] = { added: today(), stage: 0, due: today(INTERVALS[0]) };
      if (typeof t !== "string" && !LEXICON[key]) {
        S.bank[key].data = { term: t.term, cat: t.category, vi: t.vi, ex: t.example, f: Number(t.formality), who: t.who };
      }
      added++;
    }
  }
  if (added) { save(); toast(`📥 +${added} từ mới vào kho từ`); }
}
function grade(term, ok) {
  const b = S.bank[term];
  if (!b) return;
  b.stage = ok ? Math.min(b.stage + 1, INTERVALS.length) : 0;
  b.due = today(INTERVALS[Math.min(b.stage, INTERVALS.length - 1)]);
  S.reviews++;
  markActive();
}
const dueTerms = () => Object.keys(S.bank).filter((t) => S.bank[t].due <= today() && entry(t));
const learnedCount = () => Object.values(S.bank).filter((b) => b.stage >= INTERVALS.length).length;

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

// ---------- Trang chat (danh sách kịch bản) ----------
function renderHome() {
  $("#title").textContent = "TextLikeANative";
  $("#main").innerHTML = `
    <p class="lead">Luyện nhắn tin kiểu Mỹ. Chạm vào tin nhắn bất kỳ để xem nghĩa, slang và gợi ý trả lời.</p>
    <h2>Kịch bản</h2>
    <div class="cards">${SCENARIOS.map((s) => `
      <button class="card scen" data-id="${s.id}">
        <span class="avatars">${s.chars.map((c) => avatar(c)).join("")}</span>
        <span class="info"><b>${s.emoji} ${esc(s.title)}</b><small>${esc(s.en)} · ${s.chars.map((c) => CHARACTERS[c].name).join(", ")}</small><small class="muted">${esc(s.desc)}</small></span>
        ${S.done[s.id] ? `<span class="badge">✓ ${S.done[s.id]}</span>` : ""}
      </button>`).join("")}
    </div>
    <h2>Chat tự do với AI</h2>
    <button class="card scen ai" id="free-chat">
      <span class="avatars"><span class="av" style="background:#38BDF8">✨</span></span>
      <span class="info"><b>Chọn nhân vật và chủ đề</b><small>Nhân vật trả lời theo những gì bạn viết, có phản hồi chi tiết cho từng câu.</small><small class="muted">${S.apiKey ? "Đã có API key ✓" : "Cần API key Claude (⚙️ Cài đặt)"}</small></span>
    </button>
    <h2>Nhân vật</h2>
    <div class="chars">${Object.entries(CHARACTERS).map(([id, c]) => `
      <div class="char">${avatar(id)}<div><b>${c.name}, ${c.age}</b><small>${esc(c.role)}</small><small class="muted">${esc(c.style)}</small></div></div>`).join("")}
    </div>`;
  $("#main").querySelectorAll(".scen[data-id]").forEach((b) => b.addEventListener("click", () => startScripted(SCENARIOS.find((s) => s.id === b.dataset.id))));
  $("#free-chat").addEventListener("click", openFreeChatSetup);
}
function avatar(id) {
  const c = CHARACTERS[id];
  return `<span class="av" style="background:${c.color}">${c.avatar}</span>`;
}

// ---------- Chat engine ----------
let chat = null;

function openChatView(title, chars) {
  $("#chat").hidden = false;
  $("#chat-title").innerHTML = `${chars.length > 1 ? `<span class="av sm" style="background:#38BDF8">👥</span>` : avatar(chars[0])}<span><b>${esc(title)}</b><small id="chat-status">${chars.length > 1 ? chars.map((c) => CHARACTERS[c].name).join(", ") : esc(CHARACTERS[chars[0]].role)}</small></span>`;
  $("#thread").innerHTML = "";
  $("#input").value = "";
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
  chat = { mode: "script", sc, chars: sc.chars, turn: 0, history: [], userTurns: 0, token: Symbol() };
  openChatView(sc.group || CHARACTERS[sc.chars[0]].name, sc.chars);
  $("#hint-btn").hidden = false;
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
  if (st) st.textContent = `${CHARACTERS[from].name} đang nhập…`;
  await sleep(Math.min(3200, 700 + text.length * 35));
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
  el.innerHTML = `${showName ? `<div class="name">${CHARACTERS[m.from].name}</div>` : ""}
    ${group ? (showName ? avatar(m.from) : `<span class="av-space"></span>`) : ""}
    <div class="bubble" ${me ? "" : 'role="button" tabindex="0"'}>${esc(m.text)}</div>
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
  $("#input").placeholder = on ? "Nhắn tin…" : "…";
}

// Giải thích một tin nhắn: dịch, slang, tone, gợi ý trả lời
function explain(m) {
  const a = m.ann || {};
  const terms = (a.s || []).map((t) => entry(t)).filter(Boolean).concat((a.slang || []).map((x) => ({ term: x.term, cat: x.category, vi: x.vi, ex: x.example, f: Number(x.formality), who: x.who })));
  const tone = TONES[a.tone];
  const replies = m.replies || [];
  openSheet(`
    <div class="sheet-msg"><div class="bubble">${esc(m.text)}</div></div>
    ${tone ? `<div class="tone tone-${a.tone}">${tone.emoji} Tone: <b>${tone.vi}</b> <small>(${a.tone})</small></div>` : ""}
    <h3>🇻🇳 Nghĩa</h3><p class="vi">${esc(a.vi || "")}</p>
    ${terms.length ? `<h3>🔎 Slang & viết tắt</h3><div class="terms">${terms.map(termCard).join("")}</div>` : ""}
    ${replies.length ? `<h3>💬 Gợi ý trả lời</h3><div class="replies">${replies.map((r, i) => `
      <button class="reply" data-i="${i}"><span class="lvl">${["🟢 An toàn", "🟡 Tự nhiên", "🔴 Táo bạo"][(Number(r.level) || i + 1) - 1] || ""}</span><b>${esc(r.en)}</b><small>${esc(r.vi)}</small></button>`).join("")}</div>
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
function termCard(e) {
  return `<div class="term"><div class="t"><b>${esc(e.term === "sooo" ? "sooo / yesss / heyyy" : e.term)}</b><span class="cat">${CATEGORIES[e.cat]?.vi ?? ""}</span></div>
    <div>${esc(e.vi)}</div>
    <div class="ex">“${esc(e.ex)}”</div>
    <div class="meta"><span>🎚️ ${esc(FORMALITY[e.f] || "")}</span><span>👥 ${esc(WHO[e.who] || "")}</span></div></div>`;
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
  if (S.apiKey) {
    const { feedbackOnReply } = await import("./ai.js");
    try {
      return await feedbackOnReply(S.apiKey, { chars: c.chars, history, reply: text });
    } catch (e) {
      return { ...offlineFeedback(text, c.replies || [], isLast), error: e.message };
    }
  }
  return offlineFeedback(text, c.replies || [], isLast);
}

function attachFeedback(row, fb) {
  const chip = document.createElement("button");
  const score = Number(fb.score);
  chip.className = `fb-chip s${score}`;
  chip.innerHTML = `${"★".repeat(score)}${"☆".repeat(5 - score)} · ${fb.grammar.length ? `❌ ${fb.grammar.length}` : "✅"} · R${fb.react ? "✓" : "✗"} A${fb.add ? "✓" : "✗"} A${fb.ask ? "✓" : "✗"}`;
  chip.addEventListener("click", () => showFeedback(fb, $(".bubble", row).textContent));
  row.append(chip);
  scrollDown();
}

function showFeedback(fb, text) {
  const score = Number(fb.score);
  openSheet(`
    <div class="sheet-msg me"><div class="bubble">${esc(text)}</div></div>
    <h3>✍️ Ngữ pháp</h3>
    ${fb.grammar.length ? fb.grammar.map((g) => `<div class="gfix"><div>❌ <s>${esc(g.wrong)}</s> → ✅ <b>${esc(g.right)}</b></div><small>${esc(g.why)}</small></div>`).join("") : `<p>✅ Không thấy lỗi ngữ pháp.</p>`}
    ${fb.fixed ? `<p class="small">Câu đã sửa: <b>${esc(fb.fixed)}</b></p>` : ""}
    <h3>🗣️ Người bản xứ sẽ nói</h3>
    <div class="native"><b>${esc(fb.native)}</b>${fb.native_vi ? `<small>${esc(fb.native_vi)}</small>` : ""}</div>
    <h3>⭐ Độ tự nhiên: ${score}/5</h3>
    <div class="stars s${score}">${"★".repeat(score)}${"☆".repeat(5 - score)}</div>
    <p>${esc(fb.score_why)}</p>
    <h3>🔁 Giữ câu chuyện tiếp tục?</h3>
    <div class="raa"><span class="${fb.react ? "y" : "n"}">React ${fb.react ? "✓" : "✗"}</span><span class="${fb.add ? "y" : "n"}">Add ${fb.add ? "✓" : "✗"}</span><span class="${fb.ask ? "y" : "n"}">Ask ${fb.ask ? "✓" : "✗"}</span></div>
    <p>${esc(fb.flow_tip)}</p>
    ${fb.offline ? `<p class="muted small">${fb.error ? `⚠️ ${esc(fb.error)} Đang dùng phản hồi cơ bản (offline).` : "Phản hồi cơ bản (offline). Thêm API key Claude trong ⚙️ Cài đặt để được nhận xét chi tiết bằng AI."}</p>` : ""}
    <button class="btn ghost" data-close>Đóng</button>`);
}

function finishConvo() {
  const c = chat;
  c.counted = true;
  S.convos++;
  if (c.mode === "script") S.done[c.sc.id] = (S.done[c.sc.id] || 0) + 1;
  markActive();
  const el = addNote("");
  el.className = "done";
  el.innerHTML = `🎉 <b>Hoàn thành cuộc trò chuyện!</b><br><small>Chạm vào ⭐ dưới mỗi tin của bạn để xem phản hồi.</small>
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
  let sel = "mia";
  openSheet(`
    <h3>Chọn nhân vật</h3>
    <div class="pick-chars">${Object.entries(CHARACTERS).map(([id, c]) => `<button class="pc${id === sel ? " on" : ""}" data-id="${id}">${avatar(id)}<b>${c.name}</b><small>${esc(c.role)}</small></button>`).join("")}
      <button class="pc" data-id="group"><span class="av" style="background:#38BDF8">👥</span><b>Nhóm chat</b><small>Mia, Sam, Derek</small></button></div>
    <h3>Chủ đề</h3>
    <div class="topics">${SCENARIOS.map((s, i) => `<label><input type="radio" name="topic" value="${esc(s.en)}" ${i === 0 ? "checked" : ""}> ${s.emoji} ${esc(s.title)} <small class="muted">(${esc(s.en)})</small></label>`).join("")}
      <label><input type="radio" name="topic" value="custom"> ✏️ Tự nhập</label>
      <input id="custom-topic" class="field" placeholder="vd: planning a trip to Big Bear" hidden></div>
    <button class="btn" id="go">Bắt đầu chat</button>
    <p class="muted small">Mỗi lượt gọi Claude (${"claude-opus-5-5"}) bằng API key của bạn và có tính phí theo tài khoản của bạn.</p>`);
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
    startAI(sel === "group" ? ["sam", "mia", "derek"] : [sel], topic);
  });
}

async function startAI(chars, topic) {
  chat = { mode: "ai", chars, topic, history: [], userTurns: 0, replies: [] };
  openChatView(chars.length > 1 ? "👥 group chat" : CHARACTERS[chars[0]].name, chars);
  $("#hint-btn").hidden = false;
  addNote(`Chủ đề: ${topic} · Bấm ‹ để kết thúc`);
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
    const out = await nextCharacterTurn(S.apiKey, { chars: c.chars, topic: c.topic, history: c.history });
    wait.remove();
    if (c !== chat) return;
    c.replies = out.replies;
    for (const m of out.messages) {
      await typing(m.from, m.text);
      if (c !== chat) return;
      addBubble({ from: m.from, text: m.text, ann: { vi: m.vi, tone: m.tone, slang: m.slang }, replies: out.replies });
      meet(m.slang);
    }
    setComposer(true);
  } catch (e) {
    wait.remove();
    if (c !== chat) return;
    const n = addNote(`⚠️ ${e.message} `);
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
  const terms = Object.keys(S.bank).filter((t) => entry(t)).sort((a, b) => S.bank[b].added.localeCompare(S.bank[a].added) || a.localeCompare(b));
  const due = dueTerms();
  const list = terms.filter((t) => (bankFilter === "all" || entry(t).cat === bankFilter) && (!bankQuery || (t + " " + entry(t).vi).toLowerCase().includes(bankQuery)));
  $("#main").innerHTML = `
    <div class="stat-row"><div><b>${terms.length}</b><small>từ đã gặp</small></div><div><b>${learnedCount()}</b><small>đã thuộc</small></div><div><b>${due.length}</b><small>cần ôn hôm nay</small></div></div>
    <button class="btn wide" id="review" ${due.length ? "" : "disabled"}>🃏 Ôn thẻ (${due.length})</button>
    ${terms.length ? `<button class="btn ghost wide" id="review-all">Ôn tất cả ${terms.length} từ</button>` : ""}
    <input class="field" id="q" placeholder="🔍 Tìm từ…" value="${esc(bankQuery)}">
    <div class="chips">${[["all", "Tất cả"], ...Object.entries(CATEGORIES).map(([k, v]) => [k, v.vi])].map(([k, v]) => `<button class="chip${bankFilter === k ? " on" : ""}" data-k="${k}">${esc(v)}</button>`).join("")}</div>
    ${terms.length ? "" : `<p class="empty">Kho từ còn trống. Mở một kịch bản chat, từ mới sẽ tự động được lưu vào đây.</p>`}
    <div class="terms">${list.map((t) => { const b = S.bank[t]; return termCard(entry(t)).replace('<div class="meta">', `<div class="meta"><span>📆 ${b.stage >= INTERVALS.length ? "Đã thuộc ✓" : `Giai đoạn ${b.stage + 1}/${INTERVALS.length}`} · ôn ${b.due <= today() ? "hôm nay" : b.due}</span>`); }).join("")}</div>`;
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
      openSheet(`<div class="center"><div class="big">🎉</div><h3>Xong ${queue.length} thẻ</h3><p>Nhớ ${right}/${queue.length}. ${practice ? "" : "Thẻ đã nhớ sẽ quay lại sau 1 → 3 → 7 ngày."}</p><button class="btn" data-close>Đóng</button></div>`);
      if (tab === "bank") renderBank();
      return;
    }
    const t = queue[i], e = entry(t);
    openSheet(`
      <div class="fc-progress">${i + 1} / ${queue.length}</div>
      <div class="flash" id="flash"><div class="front"><b>${esc(e.term === "sooo" ? "sooo / yesss / heyyy" : e.term)}</b><div class="ex">“${esc(e.ex)}”</div><small class="muted">Chạm để lật</small></div>
        <div class="back" hidden><b>${esc(e.vi)}</b><small>${esc(CATEGORIES[e.cat]?.vi)} · ${esc(FORMALITY[e.f])}</small><small>${esc(WHO[e.who])}</small></div></div>
      <div class="row-btns" id="grade" hidden><button class="btn bad" data-ok="0">😵 Quên</button><button class="btn good" data-ok="1">😎 Nhớ</button></div>
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
  return SCENARIOS.flatMap((s) => s.turns.flatMap((t) => t.msgs.map((m) => ({ ...m, scenario: s }))));
}
function buildQuiz() {
  const msgs = allMessages();
  const qs = [];
  for (const m of pick(msgs, 4)) {
    const wrong = pick(msgs.filter((x) => x.vi !== m.vi), 2).map((x) => x.vi);
    const opts = shuffle([m.vi, ...wrong]);
    qs.push({ type: "Dịch tin nhắn", prompt: `<div class="qbubble">${esc(m.t)}</div><p>Tin này nghĩa là gì?</p>`, opts, a: opts.indexOf(m.vi), why: `Từ ${CHARACTERS[m.from].name} trong kịch bản “${m.scenario.title}”.` });
  }
  const turns = SCENARIOS.flatMap((s) => s.turns.map((t) => ({ t, s })));
  for (const { t, s } of pick(turns, 3)) {
    const good = pick(t.replies, 1)[0];
    const bad = pick(UNNATURAL, 2);
    const opts = shuffle([good.en, ...bad.map((b) => b.en)]);
    qs.push({ type: "Chọn câu trả lời tự nhiên", prompt: `${t.msgs.map((m) => `<div class="qbubble">${esc(m.t)}</div>`).join("")}<p>Câu trả lời nào tự nhiên nhất?</p>`, opts, a: opts.indexOf(good.en), why: `“${good.en}”: ${good.vi}. ${bad.map((b) => `“${b.en}”: ${b.why}`).join(" ")}` });
  }
  const seen = Object.keys(S.bank).filter((t) => entry(t)?.cat === "abbr");
  const abbrs = Object.keys(LEXICON).filter((t) => LEXICON[t].cat === "abbr");
  const pool = [...new Set([...pick(seen, 3), ...pick(abbrs, 3)])].slice(0, 3);
  for (const t of pool) {
    const e = LEXICON[t];
    const wrong = pick(abbrs.filter((x) => x !== t), 2).map((x) => LEXICON[x].vi);
    const opts = shuffle([e.vi, ...wrong]);
    qs.push({ type: "Giải mã viết tắt", prompt: `<div class="qbig">${esc(t)}</div><p>“${esc(e.ex)}”</p>`, opts, a: opts.indexOf(e.vi), why: `${t}: ${e.vi}`, term: t });
  }
  return shuffle(qs);
}

function renderQuiz() {
  $("#title").textContent = "Quiz hằng ngày";
  const r = S.quiz[today()];
  const past = Object.entries(S.quiz).sort((a, b) => b[0].localeCompare(a[0])).slice(0, 7);
  $("#main").innerHTML = `
    <div class="hero"><div class="big">🎯</div><h2>10 câu hôm nay</h2><p>Dịch tin nhắn · Chọn câu trả lời tự nhiên · Giải mã viết tắt</p>
      ${r ? `<p class="score">Hôm nay: <b>${r.best}/10</b> ✓</p>` : ""}
      <button class="btn" id="start">${r ? "Làm lại" : "Bắt đầu"}</button></div>
    ${past.length ? `<h2>7 ngày gần đây</h2><div class="history">${past.map(([d, v]) => `<div><span>${d}</span><b>${v.best}/10</b></div>`).join("")}</div>` : ""}`;
  $("#start").addEventListener("click", () => runQuiz(buildQuiz()));
}

function runQuiz(qs) {
  let i = 0, score = 0;
  const step = () => {
    if (i >= qs.length) {
      const d = today();
      S.quiz[d] = { best: Math.max(score, S.quiz[d]?.best || 0), last: score };
      markActive();
      openSheet(`<div class="center"><div class="big">${score >= 8 ? "🏆" : score >= 5 ? "👍" : "💪"}</div><h3>${score}/${qs.length} câu đúng</h3><p>${score >= 8 ? "Đỉnh quá! Bạn nhắn tin như người bản xứ rồi." : "Tiếp tục luyện chat và ôn thẻ nhé!"}</p><button class="btn" data-close>Đóng</button></div>`);
      if (tab === "quiz") renderQuiz();
      return;
    }
    const q = qs[i];
    openSheet(`
      <div class="fc-progress">${i + 1} / ${qs.length} · ${esc(q.type)}</div>
      <div class="qprompt">${q.prompt}</div>
      <div class="opts">${q.opts.map((o, k) => `<button class="opt" data-k="${k}">${esc(o)}</button>`).join("")}</div>
      <div id="why" hidden></div>
      <button class="btn" id="next" hidden>${i + 1 < qs.length ? "Câu tiếp →" : "Xem kết quả"}</button>`);
    $("#sheet-body").querySelectorAll(".opt").forEach((b) => b.addEventListener("click", () => {
      const k = Number(b.dataset.k);
      const ok = k === q.a;
      if (ok) score++;
      if (q.term) meet([q.term]);
      $("#sheet-body").querySelectorAll(".opt").forEach((x, j) => { x.disabled = true; x.classList.toggle("right", j === q.a); x.classList.toggle("wrong", j === k && !ok); });
      $("#why").hidden = false;
      $("#why").innerHTML = `<p class="${ok ? "ok" : "no"}">${ok ? "✅ Chính xác!" : "❌ Chưa đúng."}</p><p class="small">${esc(q.why)}</p>`;
      $("#next").hidden = false;
    }));
    $("#next").addEventListener("click", () => { i++; step(); });
  };
  step();
}

// ---------- Bài học ----------
function renderLessons() {
  $("#title").textContent = "Bài học kỹ năng";
  $("#main").innerHTML = `<p class="lead">Mỗi bài khoảng 2 phút. Giải thích bằng tiếng Việt, ví dụ bằng tiếng Anh.</p>
    <div class="cards">${LESSONS.map((l, i) => `<button class="card lesson" data-i="${i}"><span class="lnum">${l.emoji}</span><span class="info"><b>${esc(l.title)}</b><small class="muted">${l.sections.map((s) => esc(s.h)).join(" · ")}</small></span>${S.lessons[l.id] ? `<span class="badge">✓</span>` : ""}</button>`).join("")}</div>`;
  $("#main").querySelectorAll(".lesson").forEach((b) => b.addEventListener("click", () => openLesson(LESSONS[b.dataset.i])));
}
function openLesson(l) {
  openSheet(`
    <h2>${l.emoji} ${esc(l.title)}</h2>
    <div class="lesson-body">${l.sections.map((s) => `<h3>${esc(s.h)}</h3>${s.body}`).join("")}</div>
    <h3>✅ Kiểm tra nhanh</h3><p>${esc(l.check.q)}</p>
    <div class="opts">${l.check.opts.map((o, k) => `<button class="opt" data-k="${k}">${esc(o)}</button>`).join("")}</div>
    <div id="why" hidden></div>
    <button class="btn ghost" data-close>Đóng</button>`);
  $("#sheet-body").querySelectorAll(".opt").forEach((b) => b.addEventListener("click", () => {
    const k = Number(b.dataset.k), ok = k === l.check.a;
    $("#sheet-body").querySelectorAll(".opt").forEach((x, j) => { x.disabled = true; x.classList.toggle("right", j === l.check.a); x.classList.toggle("wrong", j === k && !ok); });
    $("#why").hidden = false;
    $("#why").innerHTML = `<p class="${ok ? "ok" : "no"}">${ok ? "✅ Chính xác!" : "❌ Chưa đúng."}</p><p class="small">${esc(l.check.why)}</p>`;
    if (!S.lessons[l.id]) { S.lessons[l.id] = today(); markActive(); }
    if (tab === "lessons") renderLessons();
  }));
}

// ---------- Tiến độ ----------
function renderProgress() {
  $("#title").textContent = "Tiến độ";
  const days = Array.from({ length: 14 }, (_, k) => today(k - 13));
  const words = Object.keys(S.bank).filter((t) => entry(t)).length;
  const byCat = Object.keys(CATEGORIES).map((c) => [c, Object.keys(S.bank).filter((t) => entry(t)?.cat === c).length, Object.values(LEXICON).filter((e) => e.cat === c).length]);
  $("#main").innerHTML = `
    <div class="tiles">
      <div class="tile"><b>🔥 ${streak()}</b><small>ngày liên tiếp</small></div>
      <div class="tile"><b>📚 ${words}</b><small>từ đã gặp</small></div>
      <div class="tile"><b>🧠 ${learnedCount()}</b><small>từ đã thuộc</small></div>
      <div class="tile"><b>💬 ${S.convos}</b><small>cuộc trò chuyện</small></div>
      <div class="tile"><b>🎯 ${Object.keys(S.quiz).length}</b><small>ngày làm quiz</small></div>
      <div class="tile"><b>🎓 ${Object.keys(S.lessons).length}/${LESSONS.length}</b><small>bài học</small></div>
    </div>
    <h2>14 ngày qua</h2>
    <div class="days">${days.map((d) => `<span class="${S.activity[d] ? "on" : ""}${d === today() ? " today" : ""}" title="${d}">${Number(d.slice(8))}</span>`).join("")}</div>
    <h2>Từ vựng theo nhóm</h2>
    <div class="bars">${byCat.map(([c, n, total]) => `<div class="bar"><span>${esc(CATEGORIES[c].vi)}</span><div><i style="width:${Math.min(100, (n / Math.max(1, total)) * 100)}%"></i></div><b>${n}</b></div>`).join("")}</div>
    <h2>Kịch bản</h2>
    <div class="history">${SCENARIOS.map((s) => `<div><span>${s.emoji} ${esc(s.title)}</span><b>${S.done[s.id] ? `✓ ×${S.done[s.id]}` : "–"}</b></div>`).join("")}</div>
    <p class="muted small">Tiến độ được lưu trong trình duyệt này.</p>`;
}

// ---------- Cài đặt ----------
function openSettings() {
  openSheet(`
    <h2>⚙️ Cài đặt</h2>
    <h3>Giao diện</h3>
    <div class="seg">${[["auto", "Tự động"], ["light", "☀️ Sáng"], ["dark", "🌙 Tối"]].map(([k, v]) => `<button class="${S.theme === k ? "on" : ""}" data-theme="${k}">${v}</button>`).join("")}</div>
    <h3>API key Claude (không bắt buộc)</h3>
    <p class="small">Các kịch bản có sẵn chạy không cần key. Có key thì bạn được <b>chat tự do với AI</b> và nhận <b>phản hồi AI</b> chi tiết cho từng câu. Lấy key tại <a href="https://platform.claude.com/settings/keys" target="_blank" rel="noopener">platform.claude.com</a>.</p>
    <input class="field" id="key" type="password" autocomplete="off" placeholder="sk-ant-…" value="${esc(S.apiKey)}">
    <p class="muted small">Key chỉ lưu trong trình duyệt của bạn và được gửi thẳng tới api.anthropic.com. Đừng dùng tính năng này trên máy dùng chung.</p>
    <div class="row-btns"><button class="btn" id="save-key">Lưu key</button>${S.apiKey ? `<button class="btn ghost" id="del-key">Xóa key</button>` : ""}</div>
    <h3>Dữ liệu</h3>
    <div class="row-btns"><button class="btn ghost" id="export">⬇️ Xuất tiến độ</button><button class="btn bad" id="reset">Xóa toàn bộ tiến độ</button></div>
    <button class="btn ghost" data-close>Đóng</button>`);
  const body = $("#sheet-body");
  body.querySelectorAll("[data-theme]").forEach((b) => b.addEventListener("click", () => { S.theme = b.dataset.theme; save(); applyTheme(); body.querySelectorAll("[data-theme]").forEach((x) => x.classList.toggle("on", x === b)); }));
  $("#save-key").addEventListener("click", () => { S.apiKey = $("#key").value.trim(); save(); toast(S.apiKey ? "Đã lưu key ✓" : "Đã xóa key"); closeSheet(); if (tab === "chat" && !chat) renderHome(); });
  $("#del-key")?.addEventListener("click", () => { S.apiKey = ""; save(); toast("Đã xóa key"); closeSheet(); if (tab === "chat" && !chat) renderHome(); });
  $("#export").addEventListener("click", () => {
    const { apiKey, ...data } = S;
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }));
    a.download = `textlikeanative-${today()}.json`;
    a.click();
  });
  $("#reset").addEventListener("click", () => {
    if (!confirm("Xóa toàn bộ kho từ, quiz và tiến độ? (API key và giao diện được giữ lại)")) return;
    S = { ...DEFAULT, theme: S.theme, apiKey: S.apiKey };
    save();
    closeSheet();
    show(tab);
  });
}

applyTheme();
show("chat");

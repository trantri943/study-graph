# CLAUDE.md

Trang Study Graph (GitHub Pages). Giao diện nằm trong `index.html`, **dữ liệu nằm trong `data.json`**. Không sửa dữ liệu trong `index.html`: trang đọc dữ liệu bằng `fetch("data.json")`, nên chỉ chạy được qua GitHub Pages hoặc một web server, không mở trực tiếp bằng file://.

## Schema của data.json

```json
{
  "groups": { "Tên nhóm": { "color": "#rrggbb" } },
  "nodes":  [ { "id": "Tên node", "group": "Tên nhóm", "parent": "Tên node cha" | null, "level": "3" } ],
  "links":  [ { "source": "Node A", "target": "Node B", "relation": "quan hệ", "note": "câu giải thích" } ],
  "notes":  { "Tên node": { "definition": "", "example": "", "question": "", "answer": "" } },
  "status": { "Tên node": { "status": "mastered|learning|weak", "lastReviewed": "YYYY-MM-DD" } }
}
```

- `nodes`: node gốc của nhóm có `parent: null`. Node con trỏ tới node cha qua `parent` và thuộc cùng `group` với cha. `level` không bắt buộc, hiện thành nhãn "Level n" trong panel.
- `links`: đường nối ngang có nhãn, giữa hai node bất kỳ. Cả hai node phải có trong `nodes`.
- `notes` của node sổ từ vựng có dạng khác: `{"type": "notebook", "file": "vocab/vocab-notebook-N.md", "words": [...], "source": "...", "created": "YYYY-MM-DD"}`. Xem mục "Sổ từ vựng" bên dưới.
- `notes` của node tài liệu có dạng: `{"type": "doc", "files": [{"title": "Tên nút", "file": "docs/....md"}], "created": "YYYY-MM-DD"}`. Panel hiện một nút "📖 <title>" cho mỗi file, bấm vào thì mở khung đọc. Tài liệu gốc lưu nguyên văn trong `docs/`. Phần soạn thêm từ tài liệu (study pack: flashcards, quiz, memory path…) để ở một file riêng, chỉ dùng nội dung có trong tài liệu gốc. Nhãn KNOWN/LIKELY/UNCERTAIN chỉ ghi khi tài liệu đã ghi, còn lại ghi "(chưa đánh giá)".
- `notes`, `status`: khóa là `id` của node. Trường nào chưa có dữ liệu thì bỏ trống hoặc không ghi.
- `id` phải duy nhất. Khi đổi tên một node, phải đổi ở mọi chỗ: `parent`, `links`, `notes`, `status`.

## Quy tắc làm việc

1. **Chỉ thêm đúng những gì tôi nói.** Không tự bịa hay tự bổ sung nội dung (node, liên kết, ghi chú, tên…). Nếu thiếu thông tin thì **hỏi tôi trước**.
2. **Trước khi sửa**, tóm tắt các thay đổi dự định để tôi xác nhận.
3. **Sau khi tôi đồng ý**: sửa file, kiểm tra `data.json` là JSON hợp lệ và mọi tham chiếu (parent, links, notes, status) trỏ tới node có thật, rồi commit và push thẳng lên nhánh `main`.

## #CAPNHAT

Khi tôi gửi tin nhắn bắt đầu bằng `#CAPNHAT`, mỗi dòng là một lệnh sửa `data.json`:

| Lệnh | Cú pháp | Ánh xạ vào data.json |
|---|---|---|
| NHOM | `NHOM: Tên nhóm` | Thêm vào `groups`, kèm một màu tự chọn chưa trùng màu nhóm khác và hợp nền đen. Thêm node gốc `{id: Tên nhóm, group: Tên nhóm, parent: null}`. |
| THEM | `THEM: Tên node > Node cha` | Thêm vào `nodes`, `group` lấy theo node cha. |
| DOITEN | `DOITEN: Tên cũ > Tên mới` | Đổi `id`, và đổi tên ở mọi chỗ tham chiếu: `parent`, `links`, `notes`, `status`. Nếu node là gốc nhóm thì hỏi có đổi tên nhóm không. |
| XOA | `XOA: Tên node` | Xóa node, cùng `links`/`notes`/`status` của nó. **Nếu node còn node con thì dừng lại hỏi tôi**, không tự xóa cả nhánh. |
| LEVEL | `LEVEL: Tên node = 3` | Gán `level`. Để trống sau `=` thì xóa `level`. |
| NOI | `NOI: Node A > Node B \| quan hệ \| giải thích` | Thêm vào `links`: `{source: A, target: B, relation, note}`. |
| GHICHU | `GHICHU: Tên node` rồi các dòng `definition: …`, `example: …`, `question: …`, `answer: …` | Ghi vào `notes`. Chỉ ghi các trường tôi gửi. |
| TRANGTHAI | `TRANGTHAI: Tên node = mastered\|learning\|weak` | Ghi vào `status`, với `lastReviewed` = ngày hôm đó. |

- Dòng nào không rõ (sai cú pháp, node không tồn tại, thiếu node cha…) thì hỏi lại, không đoán.
- Vẫn áp dụng quy tắc 2: tóm tắt các thay đổi trước, chờ tôi xác nhận rồi mới sửa và push.

## Sổ từ vựng

- Notebook N là node `Vocabulary Notebook #N`, cha là `Writing/Reading/Vocabulary`, nhóm `Language`. Nội dung nằm ở `vocab/vocab-notebook-N.md`, lưu nguyên văn những gì tôi gửi.
- **Từ vựng không phải node.** Chúng chỉ nằm trong `notes[...].words` và trong file `.md`.
- `words` lấy từ các tiêu đề dạng `### ① WORD (loại từ) — nghĩa`: chỉ lấy phần WORD, viết thường, giữ đúng thứ tự trong file. Số từ phải khớp với số tiêu đề.
- Mỗi từ là một tiêu đề `### <số khoanh> WORD (...) — ...`, theo sau là các dòng `**Def:**`, `**Syn:**`, `**Ex:**`, `**WF:**`, `**Coll:**`, `**Q:**`. Trang web đọc thẻ từ theo đúng định dạng này.
- **Không tạo notebook rỗng.** Notebook #1–#4 chờ tôi gửi nội dung.
- Thư viện render Markdown được lưu sẵn trong repo: `vendor/marked-12.0.2.min.js`.

| Lệnh | Cú pháp | Tác dụng |
|---|---|---|
| SOTAY | `SOTAY: N \| nguồn` + nội dung .md tôi dán kèm | Tạo `vocab/vocab-notebook-N.md` (nguyên văn). Thêm node `Vocabulary Notebook #N` (cha: `Writing/Reading/Vocabulary`). Thêm `notes` kiểu notebook, với `words` lấy từ các tiêu đề và `created` = ngày hôm đó. Không có nội dung thì không tạo. |
| TU | `TU: N` + khối nội dung của từ (tiêu đề số tiếp theo + Def/Syn/Ex/WF/Coll/Q) | Thêm khối vào file `.md` của notebook N, rồi thêm từ vào cuối `words`. Thêm trước phần `## 🧠 MEMORY MAP` nếu có, nếu không có thì thêm vào cuối file. |
| XOATU | `XOATU: N \| từ` | Xóa mục của từ đó trong file `.md` và trong `words`. Hỏi tôi trước khi đánh lại số thứ tự ①… hay sửa các dòng tóm tắt (Story, Memory map, "✅ x/x words"). |

## Dán JSON từ nút "Xuất dữ liệu"

JSON có dạng `{"Tên node": {"status", "lastReviewed"}}`. Gộp vào `status` của `data.json`:
- Với mỗi node, giữ bản có `lastReviewed` mới hơn.
- `status` rỗng (`""`) nghĩa là tôi đã bỏ đánh giá node đó, nên xóa node đó khỏi `status`.
- Bỏ qua tên node không có trong `nodes` và báo lại cho tôi.

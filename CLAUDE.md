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

## Dán JSON từ nút "Xuất dữ liệu"

JSON có dạng `{"Tên node": {"status", "lastReviewed"}}`. Gộp vào `status` của `data.json`:
- Với mỗi node, giữ bản có `lastReviewed` mới hơn.
- `status` rỗng (`""`) nghĩa là tôi đã bỏ đánh giá node đó, nên xóa node đó khỏi `status`.
- Bỏ qua tên node không có trong `nodes` và báo lại cho tôi.

# CLAUDE.md

Trang Study Graph (GitHub Pages) — toàn bộ nằm trong `index.html`.

## Dữ liệu graph

Dữ liệu nằm trong các biến JavaScript trong `index.html`:

- `GROUPS` — tên môn (subject) → màu hiển thị.
- `TREE` — môn → chủ đề (topic) → danh sách khái niệm (concept).
- `LEAVES` — khái niệm → danh sách khái niệm con (leaf). Khóa phải trùng với một node đã có trong `TREE`, nếu không sẽ bị bỏ qua.
- `CROSS` — các cặp `[a, b]` liên kết chéo giữa các node. Cả hai node phải tồn tại, nếu không liên kết bị bỏ qua.

Khi thêm môn mới vào `TREE`, nhớ thêm màu tương ứng trong `GROUPS`.

## Quy tắc làm việc

1. **Chỉ thêm đúng những gì tôi nói.** Không tự bịa hay tự bổ sung nội dung (node, liên kết, màu, tên…). Nếu thiếu thông tin (ví dụ: không rõ đặt vào môn/chủ đề nào, màu gì, nối với node nào) thì **hỏi tôi trước**.
2. **Trước khi sửa**, tóm tắt các thay đổi dự định (biến nào, thêm/xóa/sửa gì, ở vị trí nào) để tôi xác nhận.
3. **Sau khi tôi đồng ý**: sửa file, rồi commit và push thẳng lên nhánh `main`.

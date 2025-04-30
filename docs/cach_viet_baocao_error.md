# Hướng Dẫn Viết Báo Cáo Lỗi

Tài liệu này cung cấp hướng dẫn về cách viết báo cáo lỗi một cách chuyên nghiệp và có cấu trúc. Mẫu này được thiết kế dựa trên báo cáo `validation_error.adoc` và có thể được sử dụng làm tham khảo cho các báo cáo lỗi trong tương lai.

## Cấu Trúc Báo Cáo

Một báo cáo lỗi hiệu quả nên có cấu trúc sau:

### 1. Tiêu Đề và Thông Tin Cơ Bản
- Tiêu đề mô tả ngắn gọn về lỗi
- Tác giả và ngày tạo báo cáo
- (Tùy chọn) Mục lục nếu báo cáo dài

### 2. Giới Thiệu
- Tổng quan ngắn gọn về vấn đề (1-2 đoạn)
- Tác động của lỗi đến hệ thống hoặc người dùng
- Phạm vi của báo cáo

### 3. Phân Tích Vấn Đề
- **Mô tả lỗi**: Chi tiết về lỗi gặp phải, khi nào và làm thế nào nó xuất hiện
- **Mã nguồn ban đầu**: Trích dẫn mã nguồn có vấn đề với định dạng phù hợp
- **Phân tích nguyên nhân gốc rễ**: Lý giải tại sao lỗi xảy ra
- **Tác động đến người dùng/hệ thống**: Mô tả chi tiết về cách lỗi ảnh hưởng đến trải nghiệm người dùng hoặc hiệu suất hệ thống

### 4. Giải Pháp
- **Chiến lược giải quyết**: Lý giải cách tiếp cận đã chọn để giải quyết vấn đề
- **Các giải pháp được xem xét**: (Tùy chọn) Liệt kê các giải pháp thay thế đã xem xét 
- **Mã nguồn sau khi sửa lỗi**: Trích dẫn mã nguồn đã sửa với định dạng phù hợp
- **Giải thích về giải pháp đã chọn**: Mô tả tại sao giải pháp này hiệu quả

### 5. Cách Triển Khai
- Các bước cụ thể đã thực hiện để fix lỗi
- Mô tả chi tiết từng bước trong quá trình triển khai
- Nếu cần, bao gồm cả hình ảnh hoặc biểu đồ minh họa

### 6. Kết Quả
- **Kết quả kiểm thử**: Mô tả cách kiểm tra giải pháp
- **Cải thiện trải nghiệm người dùng**: Những thay đổi tích cực đối với UX
- **Cải thiện chất lượng mã nguồn**: Những cải tiến về mặt kỹ thuật
- **Metrics**: (Tùy chọn) Số liệu cụ thể về hiệu suất trước và sau khi sửa lỗi

### 7. Kết Luận
- Tóm tắt vấn đề và giải pháp
- Bài học kinh nghiệm
- Đề xuất phòng ngừa trong tương lai

### 8. Tài Liệu Tham Khảo
- Liên kết đến tài liệu, API, thư viện đã sử dụng
- Nguồn thông tin hữu ích khác

## Quy Tắc và Tiêu Chuẩn Định Dạng

### Trích Dẫn Mã Nguồn
- Luôn sử dụng code blocks với cú pháp highlighting phù hợp
- Đối với AsciiDoc, sử dụng:
  ```asciidoc
  [source,typescript]
  ----
  // mã nguồn ở đây
  ----
  ```
- Đối với Markdown, sử dụng:
  ```markdown
  ```typescript
  // mã nguồn ở đây
  ```
  ```

### Cách Viết Đoạn Văn
- Viết ngắn gọn, súc tích nhưng đầy đủ thông tin
- Sử dụng ngôn ngữ kỹ thuật phù hợp
- Tránh câu dài và phức tạp
- Phân đoạn văn bản thành các phần nhỏ, dễ đọc

### Định Dạng Chung
- Sử dụng các heading để phân cấp nội dung
- Áp dụng danh sách đánh số cho các bước tuần tự
- Áp dụng danh sách không đánh số cho các điểm liệt kê
- Nhấn mạnh (bold/italic) cho các từ khóa quan trọng
- Sử dụng bảng khi cần so sánh dữ liệu

## Mẫu Báo Cáo Chi Tiết

Dưới đây là mẫu chi tiết có thể sử dụng làm điểm khởi đầu khi viết báo cáo:

```markdown
# Báo Cáo Lỗi: [Tên Lỗi]

Tác giả: [Tên]
Ngày: [Ngày/Tháng/Năm]

## Giới Thiệu

[Mô tả ngắn gọn về lỗi và tác động]

## Phân Tích Vấn Đề

### Mô tả lỗi

[Mô tả chi tiết về lỗi]

### Mã nguồn ban đầu

```typescript
// Mã nguồn có vấn đề
```

### Nguyên nhân gốc rễ

[Phân tích nguyên nhân]

### Tác động đến người dùng/hệ thống

[Mô tả tác động]

## Giải Pháp

### Chiến lược giải quyết

[Mô tả chiến lược]

### Mã nguồn sau khi sửa lỗi

```typescript
// Mã nguồn đã sửa
```

### Giải thích về giải pháp

[Giải thích chi tiết]

## Cách Triển Khai

1. [Bước 1]
2. [Bước 2]
3. [Bước 3]
   ...

## Kết Quả

### Kết quả kiểm thử

[Mô tả kết quả]

### Cải thiện

- [Cải thiện 1]
- [Cải thiện 2]
- ...

## Kết Luận

[Tóm tắt và bài học kinh nghiệm]

## Tài Liệu Tham Khảo

- [Link 1]
- [Link 2]
- ...
```

## Ví Dụ Thực Tế

Xem báo cáo `validation_error.adoc` trong thư mục `docs/baocao` làm ví dụ cho cách viết báo cáo lỗi chi tiết và chuyên nghiệp. Báo cáo này trình bày về việc giải quyết lỗi trong schema xác thực form thanh toán, cụ thể là vấn đề yêu cầu thông tin thẻ tín dụng không cần thiết khi phương thức thanh toán là COD.

## Lời Khuyên Khi Viết Báo Cáo

1. **Đặt mình vào vị trí người đọc**: Viết như thể người đọc không biết gì về vấn đề.
2. **Đi từ tổng quan đến chi tiết**: Bắt đầu với tổng quan, sau đó đi vào chi tiết.
3. **Sử dụng hình ảnh khi cần**: Screenshot, biểu đồ giúp người đọc hiểu vấn đề nhanh hơn.
4. **Tập trung vào giải pháp**: Dành nhiều không gian cho giải pháp, không chỉ mô tả vấn đề.
5. **Định dạng nhất quán**: Sử dụng các quy tắc định dạng nhất quán trong toàn bộ báo cáo.
6. **Kiểm tra lại**: Đọc lại báo cáo để đảm bảo tính mạch lạc và không có lỗi chính tả.
7. **Tạo mục lục**: Đối với báo cáo dài, mục lục giúp người đọc điều hướng dễ dàng.

## Định Dạng File Báo Cáo

Dự án hỗ trợ hai định dạng chính cho báo cáo:

1. **AsciiDoc (.adoc)**: Phù hợp cho báo cáo chuyên nghiệp, hỗ trợ xuất sang PDF
   ```asciidoc
   = Tiêu Đề Báo Cáo
   :toc:
   :toc-title: Mục Lục
   :sectnums:
   :source-highlighter: highlight.js
   
   == Phần 1
   
   Nội dung...
   ```

2. **Markdown (.md)**: Đơn giản, dễ viết, phù hợp cho báo cáo nhanh
   ```markdown
   # Tiêu Đề Báo Cáo
   
   ## Phần 1
   
   Nội dung...
   ```

Chọn định dạng phù hợp với mục đích và độ phức tạp của báo cáo.

---

Việc viết báo cáo lỗi tốt không chỉ giúp tài liệu hóa vấn đề và giải pháp, mà còn là tài nguyên quý giá cho team để học hỏi và tránh lặp lại lỗi tương tự trong tương lai.

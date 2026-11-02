import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalLayout } from '@/components/layout/LegalLayout';
import { JsonLd } from '@/components/seo/JsonLd';
import { shareMetadata } from '@/lib/metadata';
import { hreflang } from '@/lib/routes';
import { pageGraph } from '@/lib/schema';
import { SUPPORT_EMAIL } from '@/lib/site';

const DESCRIPTION =
  'Trợ giúp về tiện ích Yumo, phát âm, thông báo, khôi phục Yumo Pro và hoàn tiền.';

const TITLE = 'Hỗ trợ Yumo: tiện ích, âm thanh, Pro';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: '/vi/support',
    languages: hreflang('support'),
  },
  ...shareMetadata({ locale: 'vi', path: '/vi/support', title: TITLE, description: DESCRIPTION }),
};

export default function SupportViPage() {
  return (
    <LegalLayout locale="vi" path="support" title="Yumo: Hỗ trợ">
      <JsonLd
        data={pageGraph({
          locale: 'vi',
          path: '/vi/support',
          name: 'Hỗ trợ',
          description: DESCRIPTION,
        })}
      />
      <p>
        Cứ vài giờ, Yumo lại hiện một từ tiếng Nhật mới trên màn hình khóa và màn
        hình chính của bạn. Nếu có gì không chạy đúng, trang này có những trường
        hợp thường gặp. Với các vấn đề khác, hãy gửi email cho chúng tôi. Mọi tin
        nhắn đều được đọc.
      </p>

      <h2>Liên hệ</h2>
      <p>
        Gửi email đến <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. Hãy
        cho biết thiết bị và phiên bản iOS hoặc Android của bạn, chúng tôi thường
        trả lời trong vòng hai ngày.
      </p>

      <h2>Thêm tiện ích</h2>
      <p>
        <strong>Màn hình chính iPhone:</strong> nhấn giữ một chỗ trống trên màn
        hình chính, chạm <strong>Sửa</strong>, rồi <strong>Thêm tiện ích</strong>,
        tìm Yumo và chọn kích thước.
      </p>
      <p>
        <strong>Màn hình khóa iPhone:</strong> nhấn giữ màn hình khóa, chạm{' '}
        <strong>Tùy chỉnh</strong>, chọn <strong>Màn hình khóa</strong>, chạm vào
        vùng tiện ích rồi chọn Yumo.
      </p>
      <p>
        <strong>Android:</strong> nhấn giữ một chỗ trống trên màn hình chính, chạm{' '}
        <strong>Tiện ích</strong>, tìm Yumo và kéo vào vị trí bạn muốn.
      </p>

      <h2>Câu ví dụ trên màn hình khóa</h2>
      <p>
        Với Yumo Pro trên iPhone, hãy bật <strong>Câu ví dụ trên màn hình khóa</strong>{' '}
        trong phần Cài đặt và cho phép Hoạt động trực tiếp nếu iOS hỏi. Tính năng
        này cần iOS 17.2 trở lên và có kết nối mạng. Nếu thẻ không đổi theo từ mới,
        hãy mở Yumo một lần trong khi có mạng.
      </p>

      <h2>Từ trên tiện ích không đổi</h2>
      <p>
        Yumo đổi từ theo nhịp cố định: sau mỗi 6, 12 hoặc 24 giờ với bản miễn phí,
        sau mỗi 1, 2, 3 hoặc 4 giờ với Yumo Pro. Giữa các mốc đó từ được giữ nguyên.
        Đây là chủ ý, không phải lỗi.
      </p>
      <p>
        Nếu từ có vẻ bị kẹt quá lâu sau mốc đó, hãy kiểm tra chế độ tiết kiệm pin có
        chặn làm mới nền không, rồi xóa tiện ích và thêm lại.
      </p>

      <h2>Không nghe thấy phát âm</h2>
      <p>
        Yumo phát âm bằng giọng tiếng Nhật có sẵn trong máy. Nếu không nghe thấy gì,
        hãy kiểm tra đã cài giọng tiếng Nhật chưa: trên iPhone vào Cài đặt → Trợ năng
        → Nội dung được đọc → Giọng nói, trên Android vào Cài đặt → Hỗ trợ tiếp cận →
        Đầu ra chuyển văn bản thành giọng nói. Hãy kiểm tra cả máy có đang tắt tiếng
        không.
      </p>

      <h2>Không nhận được thông báo</h2>
      <p>
        Thông báo của Yumo phải được cho phép trong cài đặt hệ thống, và công tắc
        thông báo trong phần Cài đặt của Yumo cũng phải bật. Thông báo từ mới được đặt
        ngay trên máy nên chạy được cả khi không có mạng.
      </p>

      <h2>Khôi phục Yumo Pro</h2>
      <p>
        Yumo Pro là giao dịch một lần gắn với tài khoản App Store hoặc Google Play của
        bạn, không phải tài khoản Yumo. Trên thiết bị mới hoặc sau khi cài lại, hãy mở{' '}
        <strong>Cài đặt</strong> trong Yumo và chạm <strong>Khôi phục giao dịch</strong>.
        Bạn cần đăng nhập đúng tài khoản cửa hàng đã dùng để mua.
      </p>
      <p>
        Nếu vẫn không khôi phục được, hãy gửi email kèm ngày mua, chúng tôi sẽ giúp.
        Việc hoàn tiền do Apple hoặc Google xử lý, không phải chúng tôi. Với App Store,
        hãy dùng <a href="https://reportaproblem.apple.com">reportaproblem.apple.com</a>;
        với Google Play, hãy dùng lịch sử đơn hàng trong tài khoản Google.
      </p>

      <h2>Một từ có vẻ sai</h2>
      <p>
        Từ của Yumo dựa trên dữ liệu từ điển tiếng Nhật công khai, nên đôi khi cách đọc
        hoặc bản dịch có thể chưa chính xác. Hãy gửi email cho biết từ đó và điều chưa
        đúng, chúng tôi sẽ sửa trong bản cập nhật tiếp theo.
      </p>

      <h2>Dữ liệu của bạn</h2>
      <p>
        Yumo không có tài khoản. Cài đặt, từ đã lưu và tiến độ học đều ở trên máy của
        bạn, và sẽ bị xóa khi bạn xóa ứng dụng. Xem{' '}
        <Link href="/privacy">chính sách quyền riêng tư</Link> và{' '}
        <Link href="/terms">điều khoản</Link> (bằng tiếng Anh).
      </p>
    </LegalLayout>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalLayout } from '@/components/layout/LegalLayout';
import { JsonLd } from '@/components/seo/JsonLd';
import { shareMetadata } from '@/lib/metadata';
import { hreflang } from '@/lib/routes';
import { pageGraph } from '@/lib/schema';
import { SUPPORT_EMAIL } from '@/lib/site';

const DESCRIPTION =
  'Yumo 위젯, 발음, 알림, Yumo Pro 복원, 환불에 관한 도움말.';

const TITLE = 'Yumo 지원 — 위젯, 오디오, Pro';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: '/ko/support',
    languages: hreflang('support'),
  },
  ...shareMetadata({ locale: 'ko', path: '/ko/support', title: TITLE, description: DESCRIPTION }),
};

export default function SupportKoPage() {
  return (
    <LegalLayout locale="ko" path="support" title="Yumo — 지원">
      <JsonLd
        data={pageGraph({
          locale: 'ko',
          path: '/ko/support',
          name: '지원',
          description: DESCRIPTION,
        })}
      />
      <p>
        Yumo는 몇 시간마다 잠금 화면과 홈 화면에 새로운 일본어 단어를 보여 줘요.
        뭔가 제대로 작동하지 않는다면, 이 페이지에서 자주 있는 경우를 확인해
        보세요. 그 밖의 문제는 이메일로 보내 주세요. 모든 메시지를 읽고 있어요.
      </p>

      <h2>문의</h2>
      <p>
        <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>로 이메일을 보내
        주세요. 사용 중인 기기와 iOS 또는 Android 버전을 함께 알려 주시면 보통
        이틀 안에 답장드려요.
      </p>

      <h2>위젯 추가하기</h2>
      <p>
        <strong>iPhone 홈 화면:</strong> 홈 화면의 빈 곳을 길게 누르고{' '}
        <strong>편집</strong>, <strong>위젯 추가</strong>를 차례로 탭한 다음,
        Yumo를 검색해 크기를 고르세요.
      </p>
      <p>
        <strong>iPhone 잠금 화면:</strong> 잠금 화면을 길게 누르고{' '}
        <strong>사용자화</strong>를 탭한 뒤 <strong>잠금 화면</strong>을
        고르고, 위젯 영역을 탭해 Yumo를 선택하세요.
      </p>
      <p>
        <strong>Android:</strong> 홈 화면의 빈 곳을 길게 누르고{' '}
        <strong>위젯</strong>을 탭한 뒤, Yumo를 찾아 원하는 곳으로 끌어다
        놓으세요.
      </p>

      <h2>위젯의 단어가 바뀌지 않아요</h2>
      <p>
        Yumo는 정해진 주기로 단어를 바꿔요. 무료 버전은 6, 12, 24시간마다,
        Yumo Pro는 1, 2, 3, 4시간마다예요. 그 사이에는 단어가 그대로 유지되는데,
        오류가 아니라 의도된 동작이에요.
      </p>
      <p>
        주기가 한참 지났는데도 멈춰 있는 것 같다면, 배터리 절약 모드나 저전력
        모드가 백그라운드 새로 고침을 막고 있지 않은지 확인한 다음 위젯을
        삭제하고 다시 추가해 보세요.
      </p>

      <h2>발음이 들리지 않아요</h2>
      <p>
        Yumo는 기기에 내장된 일본어 음성으로 말해요. 아무 소리도 들리지 않는다면
        일본어 음성이 설치되어 있는지 확인하세요. iPhone은 설정 → 손쉬운 사용 →
        콘텐츠 말하기 → 음성, Android는 설정 → 접근성 → 텍스트 음성 변환
        출력에서 확인할 수 있어요. 기기가 무음 상태인지도 확인해 보세요.
      </p>

      <h2>알림이 오지 않아요</h2>
      <p>
        시스템 설정에서 Yumo의 알림이 허용되어 있어야 하고, Yumo 설정 화면의
        알림 스위치도 켜져 있어야 해요. 알림은 기기에서 직접 예약되기 때문에
        인터넷 연결 없이도 작동해요.
      </p>

      <h2>Yumo Pro 복원하기</h2>
      <p>
        Yumo Pro는 Yumo 계정이 아니라 App Store 또는 Google Play 계정에 연결된
        1회 구매예요. 새 기기에서, 또는 앱을 다시 설치한 뒤에는 Yumo의{' '}
        <strong>설정</strong>을 열고 <strong>구매 복원</strong>을 탭하세요.
        구매할 때 사용한 스토어 계정으로 로그인되어 있어야 해요.
      </p>
      <p>
        그래도 복원되지 않으면 구매 날짜와 함께 이메일을 보내 주세요. 도와
        드릴게요. 환불은 저희가 아니라 Apple 또는 Google이 처리해요. App Store는{' '}
        <a href="https://reportaproblem.apple.com">reportaproblem.apple.com</a>
        을, Google Play는 Google 계정의 주문 내역을 이용하세요.
      </p>

      <h2>단어가 잘못된 것 같아요</h2>
      <p>
        Yumo의 단어는 공개된 일본어 사전 데이터를 바탕으로 해서, 가끔 읽는 법이나
        번역이 정확하지 않을 수 있어요. 해당 단어와 무엇이 이상한지 이메일로
        알려 주시면 다음 업데이트에서 고칠게요.
      </p>

      <h2>내 데이터</h2>
      <p>
        Yumo에는 계정이 없고, 어떤 개인정보도 수집하지 않아요. 설정, 저장한
        단어, 학습 기록 등 모든 것이 기기에만 남고, 앱을 삭제하면 전부
        지워져요. <Link href="/privacy">개인정보 처리방침</Link>과{' '}
        <Link href="/terms">이용약관</Link>(영어)을 확인해 보세요.
      </p>
    </LegalLayout>
  );
}

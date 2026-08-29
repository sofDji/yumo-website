import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { localePath, type Dictionary, type Locale } from '@/lib/i18n';
import { SUPPORT_EMAIL } from '@/lib/site';

export function Footer({ locale, t }: { locale: Locale; t: Dictionary['footer'] }) {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-14 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Logo height={26} />
          <div>
            <p className="font-semibold">Yumo</p>
            <p className="text-sm text-muted">{t.tagline}</p>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <Link
            href={localePath(locale, 'support')}
            className="text-muted transition-colors hover:text-ink"
          >
            {t.support}
          </Link>
          <Link href="/jlpt/n5" className="text-muted transition-colors hover:text-ink">
            {t.jlpt}
            {t.englishOnly}
          </Link>
          {/* Privacy and terms are English only and binding. On the French
              pages they are marked so the language change is not a surprise. */}
          <Link href="/privacy" className="text-muted transition-colors hover:text-ink">
            {t.privacy}
            {t.englishOnly}
          </Link>
          <Link href="/terms" className="text-muted transition-colors hover:text-ink">
            {t.terms}
            {t.englishOnly}
          </Link>
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-muted transition-colors hover:text-ink">
            {t.contact}
          </a>
        </nav>
      </div>

      <div className="mx-auto w-full max-w-6xl px-6 pb-10 text-xs leading-relaxed text-muted">
        <p>{t.attribution}</p>
      </div>
    </footer>
  );
}

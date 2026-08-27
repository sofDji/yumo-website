import Image from 'next/image';
import Link from 'next/link';
import { SUPPORT_EMAIL } from '@/lib/site';

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-14 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="" width={40} height={40} className="rounded-xl" />
          <div>
            <p className="font-semibold">Yumo</p>
            <p className="text-sm text-muted">Japanese, without opening an app.</p>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <Link href="/support" className="text-muted transition-colors hover:text-ink">
            Support
          </Link>
          <Link href="/privacy" className="text-muted transition-colors hover:text-ink">
            Privacy
          </Link>
          <Link href="/terms" className="text-muted transition-colors hover:text-ink">
            Terms
          </Link>
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-muted transition-colors hover:text-ink">
            Contact
          </a>
        </nav>
      </div>

      <div className="mx-auto w-full max-w-6xl px-6 pb-10 text-xs leading-relaxed text-muted">
        <p>
          © 2026 Yumo. Stroke order diagrams © KanjiVG (Ulrich Apel), CC BY-SA 4.0.
          French, German and Spanish translations include data from JMdict/EDICT
          (EDRDG), used under CC BY-SA 4.0.
        </p>
      </div>
    </footer>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalLayout } from '@/components/layout/LegalLayout';
import { JsonLd } from '@/components/seo/JsonLd';
import { shareMetadata } from '@/lib/metadata';
import { hreflang } from '@/lib/routes';
import { pageGraph } from '@/lib/schema';
import { SUPPORT_EMAIL } from '@/lib/site';

const DESCRIPTION =
  'Hilfe zum Yumo-Widget, zur Aussprache, zu Mitteilungen, zum Wiederherstellen von Yumo Pro und zu Erstattungen.';

const TITLE = 'Yumo Hilfe — Widget, Audio und Pro';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: '/de/support',
    languages: hreflang('support'),
  },
  ...shareMetadata({ locale: 'de', path: '/de/support', title: TITLE, description: DESCRIPTION }),
};

export default function SupportDePage() {
  return (
    <LegalLayout locale="de" path="support" title="Yumo — Hilfe">
      <JsonLd
        data={pageGraph({
          locale: 'de',
          path: '/de/support',
          name: 'Hilfe',
          description: DESCRIPTION,
        })}
      />
      <p>
        Yumo zeigt dir alle paar Stunden ein neues japanisches Wort auf deinem
        Sperr- und Home-Bildschirm. Wenn etwas nicht funktioniert, findest du
        hier die häufigsten Fälle. Für alles andere schreib uns — wir lesen jede
        Nachricht.
      </p>

      <h2>Kontakt</h2>
      <p>
        Schreib an <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. Gib
        bitte dein Gerät und deine iOS- oder Android-Version an; wir antworten
        meist innerhalb von zwei Tagen.
      </p>

      <h2>Das Widget hinzufügen</h2>
      <p>
        <strong>iPhone, Home-Bildschirm:</strong> Halte eine freie Stelle auf
        dem Home-Bildschirm gedrückt, tippe auf <strong>Bearbeiten</strong> und
        dann auf <strong>Widget hinzufügen</strong>, suche nach Yumo und wähle
        eine Größe.
      </p>
      <p>
        <strong>iPhone, Sperrbildschirm:</strong> Halte den Sperrbildschirm
        gedrückt, tippe auf <strong>Anpassen</strong>, wähle{' '}
        <strong>Sperrbildschirm</strong>, tippe auf einen Widget-Bereich und
        wähle Yumo.
      </p>
      <p>
        <strong>Android:</strong> Halte eine freie Stelle auf dem
        Home-Bildschirm gedrückt, tippe auf <strong>Widgets</strong>, suche Yumo
        und zieh es an die gewünschte Stelle.
      </p>

      <h2>Das Widget wechselt das Wort nicht</h2>
      <p>
        Yumo wechselt in einem festen Rhythmus — alle 6, 12 oder 24 Stunden in
        der Gratisversion, oder alle 1, 2, 3 oder 4 Stunden mit Yumo Pro.
        Dazwischen bleibt das Wort stehen; das ist Absicht, kein Fehler.
      </p>
      <p>
        Wenn es deutlich länger hängt als sein Intervall, prüf, ob der
        Stromsparmodus die Hintergrundaktualisierung anhält, entferne dann das
        Widget und füge es neu hinzu.
      </p>

      <h2>Die Aussprache ist nicht zu hören</h2>
      <p>
        Yumo spricht über die eingebaute japanische Stimme deines Geräts. Wenn
        nichts zu hören ist, stell sicher, dass eine japanische Stimme
        installiert ist: auf dem iPhone unter Einstellungen → Bedienungshilfen →
        Gesprochene Inhalte → Stimmen; auf Android unter Einstellungen →
        Bedienungshilfen → Sprachausgabe. Prüf auch, ob dein Gerät stumm
        geschaltet ist.
      </p>

      <h2>Mitteilungen kommen nicht an</h2>
      <p>
        Mitteilungen müssen in deinen Systemeinstellungen für Yumo erlaubt sein,
        und der Schalter in Yumos eigenen Einstellungen muss an sein. Yumo plant
        sie lokal auf deinem Gerät, sie funktionieren also ohne
        Internetverbindung.
      </p>

      <h2>Yumo Pro wiederherstellen</h2>
      <p>
        Yumo Pro ist ein Einmalkauf, der an dein App-Store- oder
        Google-Play-Konto gebunden ist, nicht an ein Yumo-Konto. Öffne auf einem
        neuen Gerät oder nach einer Neuinstallation die{' '}
        <strong>Einstellungen</strong> in Yumo und tippe auf{' '}
        <strong>Kauf wiederherstellen</strong> — angemeldet mit dem Store-Konto,
        mit dem du gekauft hast.
      </p>
      <p>
        Klappt die Wiederherstellung trotzdem nicht, schreib uns mit dem
        Kaufdatum, und wir helfen dir. Erstattungen laufen über Apple oder
        Google, nicht über uns — für den App Store nutze{' '}
        <a href="https://reportaproblem.apple.com">reportaproblem.apple.com</a>;
        bei Google Play den Bestellverlauf in deinem Google-Konto.
      </p>

      <h2>Ein Wort scheint falsch zu sein</h2>
      <p>
        Yumos Wortschatz stammt aus offenen japanischen Wörterbuchdaten, und
        gelegentlich ist eine Lesung oder Übersetzung daneben. Schick uns das
        Wort und was dir falsch vorkommt, und wir korrigieren es im nächsten
        Update.
      </p>

      <h2>Deine Daten</h2>
      <p>
        Yumo hat keine Konten und sammelt keine personenbezogenen Daten. Alles —
        Einstellungen, gespeicherte Wörter, Fortschritt — bleibt auf deinem
        Gerät, und wer die App löscht, löscht alles. Siehe die{' '}
        <Link href="/privacy">Datenschutzerklärung</Link> und die{' '}
        <Link href="/terms">Nutzungsbedingungen</Link> (auf Englisch).
      </p>
    </LegalLayout>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalLayout } from '@/components/layout/LegalLayout';
import { JsonLd } from '@/components/seo/JsonLd';
import { pageGraph } from '@/lib/schema';
import { SUPPORT_EMAIL } from '@/lib/site';

const DESCRIPTION =
  'Aide pour le widget Yumo, la prononciation, les notifications, la restauration de Yumo Pro et les remboursements.';

export const metadata: Metadata = {
  title: 'Assistance — Yumo',
  description: DESCRIPTION,
  alternates: {
    canonical: '/fr/support',
    languages: { en: '/support', fr: '/fr/support', 'x-default': '/support' },
  },
};

export default function SupportFrPage() {
  return (
    <LegalLayout locale="fr" path="support" title="Yumo — Assistance">
      <JsonLd
        data={pageGraph({
          locale: 'fr',
          path: '/fr/support',
          name: 'Assistance',
          description: DESCRIPTION,
        })}
      />
      <p>
        Yumo vous montre un nouveau mot japonais toutes les quelques heures, sur
        votre écran de verrouillage et votre écran d&apos;accueil. Si quelque
        chose ne fonctionne pas, cette page couvre les cas les plus courants.
        Pour tout le reste, écrivez-nous — nous lisons chaque message.
      </p>

      <h2>Contact</h2>
      <p>
        Écrivez à <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
        Précisez votre appareil et votre version d&apos;iOS ou d&apos;Android ;
        nous répondons généralement sous deux jours.
      </p>

      <h2>Ajouter le widget</h2>
      <p>
        <strong>iPhone, écran d&apos;accueil :</strong> appuyez longuement sur
        une zone vide de l&apos;écran d&apos;accueil, touchez{' '}
        <strong>Modifier</strong> puis <strong>Ajouter un widget</strong>,
        cherchez Yumo et choisissez une taille.
      </p>
      <p>
        <strong>iPhone, écran de verrouillage :</strong> appuyez longuement sur
        l&apos;écran de verrouillage, touchez <strong>Personnaliser</strong>,
        choisissez <strong>Écran de verrouillage</strong>, touchez une zone de
        widget et sélectionnez Yumo.
      </p>
      <p>
        <strong>Android :</strong> appuyez longuement sur une zone vide de
        l&apos;écran d&apos;accueil, touchez <strong>Widgets</strong>, trouvez
        Yumo et faites-le glisser où vous voulez.
      </p>

      <h2>Le widget ne change pas de mot</h2>
      <p>
        Yumo tourne à un rythme fixe — toutes les 6, 12 ou 24 heures en version
        gratuite, ou toutes les 1, 2, 3 ou 4 heures avec Yumo Pro. Entre deux, le
        mot ne bouge pas : c&apos;est voulu, ce n&apos;est pas un défaut.
      </p>
      <p>
        S&apos;il semble bloqué bien au-delà de son intervalle, vérifiez que le
        mode économie d&apos;énergie ne suspend pas l&apos;actualisation en
        arrière-plan, puis retirez le widget et rajoutez-le.
      </p>

      <h2>La prononciation ne se lance pas</h2>
      <p>
        Yumo utilise la voix japonaise intégrée à votre appareil. Si vous
        n&apos;entendez rien, assurez-vous qu&apos;une voix japonaise est
        installée : sur iPhone, Réglages → Accessibilité → Contenu énoncé →
        Voix ; sur Android, Paramètres → Accessibilité → Synthèse vocale.
        Vérifiez aussi que votre appareil n&apos;est pas en silencieux.
      </p>

      <h2>Les notifications n&apos;arrivent pas</h2>
      <p>
        Les notifications doivent être autorisées pour Yumo dans les réglages de
        votre système, et l&apos;interrupteur doit être activé dans les Réglages
        de Yumo. Yumo les programme localement sur votre appareil : elles
        fonctionnent sans connexion internet.
      </p>

      <h2>Restaurer Yumo Pro</h2>
      <p>
        Yumo Pro est un achat unique lié à votre compte App Store ou Google Play,
        et non à un compte Yumo. Sur un nouvel appareil, ou après une
        réinstallation, ouvrez <strong>Réglages</strong> dans Yumo et touchez{' '}
        <strong>Restaurer les achats</strong>, en étant connecté avec le compte
        utilisé lors de l&apos;achat.
      </p>
      <p>
        Si la restauration échoue toujours, écrivez-nous avec la date
        d&apos;achat et nous vous aiderons. Les remboursements sont gérés par
        Apple ou Google, pas par nous : pour l&apos;App Store, utilisez{' '}
        <a href="https://reportaproblem.apple.com">reportaproblem.apple.com</a> ;
        sur Google Play, passez par l&apos;historique de commandes de votre
        compte Google.
      </p>

      <h2>Un mot semble incorrect</h2>
      <p>
        Le vocabulaire de Yumo provient de données de dictionnaire japonais
        ouvertes, et il arrive qu&apos;une lecture ou une traduction soit
        inexacte. Envoyez-nous le mot et ce qui vous paraît faux, nous le
        corrigerons dans la mise à jour suivante.
      </p>

      <h2>Vos données</h2>
      <p>
        Yumo n&apos;a aucun compte et ne collecte aucune donnée personnelle.
        Tout — réglages, mots enregistrés, progression — reste sur votre
        appareil, et supprimer l&apos;application supprime tout. Consultez la{' '}
        <Link href="/privacy">politique de confidentialité</Link> et les{' '}
        <Link href="/terms">conditions d&apos;utilisation</Link> (en anglais).
      </p>
    </LegalLayout>
  );
}

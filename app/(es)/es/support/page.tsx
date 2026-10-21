import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalLayout } from '@/components/layout/LegalLayout';
import { JsonLd } from '@/components/seo/JsonLd';
import { shareMetadata } from '@/lib/metadata';
import { hreflang } from '@/lib/routes';
import { pageGraph } from '@/lib/schema';
import { SUPPORT_EMAIL } from '@/lib/site';

const DESCRIPTION =
  'Ayuda con el widget de Yumo, la pronunciación, las notificaciones, la restauración de Yumo Pro y los reembolsos.';

const TITLE = 'Ayuda de Yumo — widget, audio y Pro';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: '/es/support',
    languages: hreflang('support'),
  },
  ...shareMetadata({ locale: 'es', path: '/es/support', title: TITLE, description: DESCRIPTION }),
};

export default function SupportEsPage() {
  return (
    <LegalLayout locale="es" path="support" title="Yumo — Ayuda">
      <JsonLd
        data={pageGraph({
          locale: 'es',
          path: '/es/support',
          name: 'Ayuda',
          description: DESCRIPTION,
        })}
      />
      <p>
        Yumo te muestra una palabra japonesa nueva cada pocas horas, en tu
        pantalla de bloqueo y en tu pantalla de inicio. Si algo no funciona,
        aquí tienes los casos más comunes. Para todo lo demás, escríbenos: leemos
        cada mensaje.
      </p>

      <h2>Contacto</h2>
      <p>
        Escribe a <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
        Indica tu dispositivo y tu versión de iOS o Android; normalmente
        respondemos en un par de días.
      </p>

      <h2>Añadir el widget</h2>
      <p>
        <strong>iPhone, pantalla de inicio:</strong> mantén pulsada una zona
        vacía de la pantalla de inicio, toca <strong>Editar</strong> y luego{' '}
        <strong>Añadir widget</strong>, busca Yumo y elige un tamaño.
      </p>
      <p>
        <strong>iPhone, pantalla de bloqueo:</strong> mantén pulsada la pantalla
        de bloqueo, toca <strong>Personalizar</strong>, elige{' '}
        <strong>Pantalla de bloqueo</strong>, toca una zona de widgets y
        selecciona Yumo.
      </p>
      <p>
        <strong>Android:</strong> mantén pulsada una zona vacía de la pantalla
        de inicio, toca <strong>Widgets</strong>, busca Yumo y arrástralo donde
        quieras.
      </p>

      <h2>El widget no cambia de palabra</h2>
      <p>
        Yumo cambia a un ritmo fijo: cada 6, 12 o 24 horas en la versión
        gratuita, o cada 1, 2, 3 o 4 horas con Yumo Pro. Entre medias, la palabra
        se queda; es intencionado, no un fallo.
      </p>
      <p>
        Si parece atascada mucho más allá de su intervalo, comprueba que el
        modo de ahorro de batería no esté suspendiendo la actualización en
        segundo plano, y después quita el widget y vuelve a añadirlo.
      </p>

      <h2>La pronunciación no suena</h2>
      <p>
        Yumo habla con la voz japonesa integrada de tu dispositivo. Si no oyes
        nada, asegúrate de tener instalada una voz japonesa: en iPhone, Ajustes
        → Accesibilidad → Contenido leído → Voces; en Android, Ajustes →
        Accesibilidad → Salida de texto a voz. Comprueba también que el
        dispositivo no esté en silencio.
      </p>

      <h2>No llegan las notificaciones</h2>
      <p>
        Las notificaciones deben estar permitidas para Yumo en los ajustes del
        sistema, y el interruptor de la pantalla de Ajustes de Yumo debe estar
        activado. Yumo las programa en tu dispositivo, así que funcionan sin
        conexión a internet.
      </p>

      <h2>Restaurar Yumo Pro</h2>
      <p>
        Yumo Pro es una compra única vinculada a tu cuenta del App Store o de
        Google Play, no a una cuenta de Yumo. En un dispositivo nuevo, o tras
        reinstalar, abre <strong>Ajustes</strong> en Yumo y toca{' '}
        <strong>Restaurar compra</strong>, con la sesión iniciada en la misma
        cuenta de la tienda con la que la compraste.
      </p>
      <p>
        Si aun así no se restaura, escríbenos con la fecha de compra y te
        ayudamos. Los reembolsos los gestionan Apple o Google, no nosotros: para
        el App Store usa{' '}
        <a href="https://reportaproblem.apple.com">reportaproblem.apple.com</a>;
        en Google Play, el historial de pedidos de tu cuenta de Google.
      </p>

      <h2>Una palabra parece incorrecta</h2>
      <p>
        El vocabulario de Yumo procede de datos abiertos de diccionarios
        japoneses, y a veces una lectura o una traducción no es exacta.
        Envíanos la palabra y lo que te parece mal, y lo corregiremos en la
        próxima actualización.
      </p>

      <h2>Tus datos</h2>
      <p>
        Yumo no tiene cuentas y no recopila datos personales. Todo (ajustes,
        palabras guardadas, progreso) se queda en tu dispositivo, y al borrar la
        app se borra todo. Consulta la{' '}
        <Link href="/privacy">política de privacidad</Link> y las{' '}
        <Link href="/terms">condiciones de uso</Link> (en inglés).
      </p>
    </LegalLayout>
  );
}

import type { Metadata } from 'next';
import { RootShell } from '@/components/RootShell';
import { SITE_URL } from '@/lib/site';
import '../globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <RootShell locale="en">{children}</RootShell>;
}

import type { Metadata } from 'next';
import { RootShell } from '@/components/RootShell';
import { appBannerMetadata } from '@/lib/metadata';
import { SITE_URL } from '@/lib/site';
import '../globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...appBannerMetadata(),
};

export default function DeLayout({ children }: { children: React.ReactNode }) {
  return <RootShell locale="de">{children}</RootShell>;
}

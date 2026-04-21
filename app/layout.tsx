import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NCM Dashboard - Nejme Chamal Messagerie',
  description: 'Tableau de bord opérationnel complet pour Nejme Chamal Messagerie',
  generator: 'Next.js',
  applicationName: 'NCM Dashboard',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  userScalable: true,
  themeColor: '#3275FF',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" style={{ margin: 0, padding: 0 }}>
      <body style={{ margin: 0, padding: 0, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}

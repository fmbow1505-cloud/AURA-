import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AURA - Intelligence Hub',
  description: 'Interface de chat multi-IA premium',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, padding: 0, backgroundColor: '#0B0F19' }}>
        {children}
      </body>
    </html>
  );
}

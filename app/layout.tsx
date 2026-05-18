import type { Metadata } from 'next';
import './globals.css'; // Si tu as un fichier CSS global

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
      <body>{children}</body>
    </html>
  );
}

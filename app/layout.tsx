import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Junk or No? | Your friendly food checker',
  description: 'A quick, friendly way to check if a food is junk food or not.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

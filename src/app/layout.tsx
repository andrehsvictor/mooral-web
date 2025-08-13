import type { Metadata } from 'next';
import './globals.css';
import ThemeProviderWrapper from './theme-provider';

export const metadata: Metadata = {
  title: 'Mooral',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ThemeProviderWrapper>{children}</ThemeProviderWrapper>
      </body>
    </html>
  );
}

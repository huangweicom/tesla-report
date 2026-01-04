import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Tesla Insights Portal',
  description: 'A modern Next.js experience with secure access.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="container header">
          <div className="brand">
            <span aria-hidden>⚡</span>
            Tesla Insights Portal
          </div>
          <Link className="cta" href="/login">
            登录 / Login
          </Link>
        </header>
        <main className="container">{children}</main>
        <footer>Built with Next.js 14 — Experience the future of EV intelligence.</footer>
      </body>
    </html>
  );
}

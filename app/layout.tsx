import './globals.css';
import './brand-system.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DinkBoston - Private Pickleball Coaching Marketplace',
  description: 'Connecting Boston rec-league pickleball players with vetted private coaches for hourly drills on legal courts.',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:wght@700;900&family=Open+Sans:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import '~/app/globals.css';
import { cn } from '~/components/ui';
import { TRPCReactProvider } from '~/trpc/react';
import { Header } from '~/components/Header';
import { Toaster } from '~/components/ui/Toaster';

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'Firestone',
  description: 'Firestone',
  openGraph: {
    title: 'Firestone',
    description: 'Firestone',
    siteName: 'Firestone',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'dark bg-background text-foreground min-h-screen font-sans antialiased [--header-height:40px]',
          geistSans.variable,
          geistMono.variable,
        )}
      >
        <TRPCReactProvider>
          <Header />

          <div className="h-[calc(100vh-var(--header-height))]">
            {props.children}
            <Toaster />
          </div>
        </TRPCReactProvider>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Syne, DM_Mono, Instrument_Serif } from 'next/font/google';
import './globals.css';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
});
const dmMono = DM_Mono({
  subsets: ['latin'],
  variable: '--font-dm-mono',
  weight: ['400', '500'],
  style: ['normal', 'italic'],
});
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-instrument',
  weight: ['400'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: 'Sahil Singh — Full Stack Engineer',
  description:
    'Portfolio of Sahil Singh — Full Stack Engineer specializing in MERN, Python, GraphQL, and scalable systems. Open to new opportunities.',
  keywords: ['Full Stack Developer', 'MERN Stack', 'React', 'Node.js', 'GraphQL', 'Python', 'Sahil Singh'],
  openGraph: {
    title: 'Sahil Singh — Full Stack Engineer',
    description: 'Engineering scalable systems. Open to opportunities.',
    type: 'website',
    url: 'https://sahilsingh.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sahil Singh — Full Stack Engineer',
    description: 'Engineering scalable systems. Open to opportunities.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${syne.variable} ${dmMono.variable} ${instrumentSerif.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}

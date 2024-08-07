import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { Karla } from 'next/font/google';

import { Toaster } from '@/components/ui/Toast/Toaster';

const mainFont = Karla({ subsets: ['latin', 'latin-ext'], variable: '--main-font' });

export const metadata: Metadata = {
    title: 'Junior Jobs',
    description:
        'Junior Jobs connects young talent with top employers. Explore thousands of entry-level opportunities and kickstart your career today!',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            className={mainFont.variable}
            lang="en"
        >
            <body>
                {children}
                <Analytics />
                <Toaster />
            </body>
        </html>
    );
}

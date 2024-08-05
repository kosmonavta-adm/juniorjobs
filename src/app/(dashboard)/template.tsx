'use client';

import ReactQueryProvider from '@/components/providers/ReactQueryProvider';

export default function RootTemplate({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <ReactQueryProvider>{children}</ReactQueryProvider>;
}

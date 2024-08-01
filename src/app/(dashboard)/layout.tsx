import DesktopNavigation from '@/components/navigation/DesktopNavigation';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col">
            <DesktopNavigation />
            <main>{children}</main>
        </div>
    );
}

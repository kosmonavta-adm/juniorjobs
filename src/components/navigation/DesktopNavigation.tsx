import Link from 'next/link';

import { menu } from '@/components/navigation/_navigationUtils';
import Logo from '@/components/ui/Logo';

const DesktopNavigation = () => {
    return (
        <nav className="flex justify-between px-16 py-8">
            <Logo variant="dark" />
            <menu className="flex gap-12">
                {menu.map((menuItem) => (
                    <li
                        key={menuItem.id}
                        className="text-lg font-medium"
                    >
                        <Link href={menuItem.url}>{menuItem.name}</Link>
                    </li>
                ))}
            </menu>
        </nav>
    );
};

export default DesktopNavigation;

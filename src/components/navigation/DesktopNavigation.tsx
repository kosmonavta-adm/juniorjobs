import Link from 'next/link';

import { menu } from '@/components/navigation/_navigationUtils';
import Logo from '@/components/ui/Logo';

const DesktopNavigation = () => {
    return (
        <nav className="flex justify-between bg-purple-800 px-16 py-8">
            <Logo variant="light" />
            <menu>
                {menu.map((menuItem) => (
                    <li
                        key={menuItem.id}
                        className="text-lg font-bold text-white"
                    >
                        <Link href={menuItem.url}>{menuItem.name}</Link>
                    </li>
                ))}
            </menu>
        </nav>
    );
};

export default DesktopNavigation;

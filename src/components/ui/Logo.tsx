import { ClassValue } from 'clsx';

import Leaf from '@/components/icons/Leaf';
import { cxTw } from '@/utils/utils';

type LogoProps = {
    className?: ClassValue;
    variant: 'light' | 'dark';
};

const Logo = ({ className, variant }: LogoProps) => {
    return (
        <div className={cxTw('flex h-fit items-center gap-3', className)}>
            <Leaf className={cxTw('h-7 w-7', variant === 'light' ? 'stroke-white' : 'stroke-black')} />
            <p className={cxTw('text-2xl font-medium', variant === 'light' ? 'text-white' : 'text-black')}>
                Junior Jobs
            </p>
        </div>
    );
};

export default Logo;

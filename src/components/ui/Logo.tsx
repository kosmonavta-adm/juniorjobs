import { ClassValue } from 'clsx';

import Leaf from '@/components/icons/Leaf';
import { cxTw } from '@/utils/utils';

type LogoProps = {
    className?: ClassValue;
    variant: 'light' | 'dark';
};

const Logo = ({ className, variant }: LogoProps) => {
    return (
        <div className={cxTw('flex h-fit items-center gap-2', className)}>
            <Leaf className={cxTw('h-8 w-8', variant === 'light' ? 'stroke-white' : 'stroke-purple-800')} />
            <p className={cxTw('text-2xl font-bold', variant === 'light' ? 'text-white' : 'text-purple-800')}>
                Junior Jobs
            </p>
        </div>
    );
};

export default Logo;

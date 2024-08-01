import { ClassValue } from 'clsx';

import Leaf from '@/components/icons/Leaf';
import { cxTw } from '@/utils/utils';

type LogoProps = {
    className: ClassValue;
};

const Logo = ({ className }: LogoProps) => {
    return (
        <div className={cxTw('flex h-fit items-center gap-2', className)}>
            <Leaf className="h-8 w-8 stroke-white" />
            <p className="text-2xl font-bold text-white">Junior Jobs</p>
        </div>
    );
};

export default Logo;

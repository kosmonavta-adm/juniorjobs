import { clsx } from 'clsx';
import { ReactNode } from 'react';

import { X } from '@/components/icons';

type ChipParams = {
    value: ReactNode;
    size?: 'md' | 'sm';
    variant: 'light' | 'dark';
    onDelete?: () => void;
};

const Chip = ({ value, onDelete, size = 'md', variant }: ChipParams) => {
    const isOnDeleteDefined = onDelete !== undefined;
    return (
        <div
            className={clsx(
                'flex w-fit gap-3',
                variant === 'light' && 'bg-neutral-50',
                size === 'md' && 'px-3 py-2',
                size === 'sm' && 'px-2 py-1 text-sm'
            )}
        >
            <div className="flex gap-2">
                <p className="">{value}</p>
            </div>
            {isOnDeleteDefined && (
                <button
                    type="button"
                    onClick={() => onDelete()}
                >
                    <X
                        width={16}
                        height={16}
                    />
                </button>
            )}
        </div>
    );
};

export default Chip;

import { ComponentPropsWithoutRef, forwardRef, ReactNode, useId } from 'react';

import ErrorText from '@/components/ui/ErrorText';
import { Label } from '@/components/ui/Label';
import { cxTw } from '@/utils/utils';

interface Textarea extends ComponentPropsWithoutRef<'textarea'> {
    label?: {
        value: string;
        className?: string;
    };
    rows?: number;
    error?: string;
    helperText?: ReactNode;
}

const Textarea = forwardRef<HTMLTextAreaElement, Textarea>(
    ({ label, rows = 3, error, className, helperText, ...props }, ref) => {
        const id = useId();
        const isLabelGiven = label !== undefined;

        return (
            <div className={cxTw('grid gap-2', className)}>
                {isLabelGiven && (
                    <Label
                        className={cxTw(label.className)}
                        htmlFor={id}
                    >
                        {label.value}
                    </Label>
                )}
                <textarea
                    ref={ref}
                    id={id}
                    rows={rows}
                    className="'flex w-full border border-neutral-300 px-3 py-2 text-sm placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:opacity-50"
                    {...props}
                />
                {helperText && <p className="ml-auto">{helperText}</p>}
                {error && <ErrorText>{error}</ErrorText>}
            </div>
        );
    }
);

Textarea.displayName = 'Textarea';

export default Textarea;

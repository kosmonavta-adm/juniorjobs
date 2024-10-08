import { clsx } from 'clsx';
import { ChangeEvent, ComponentPropsWithoutRef, ElementRef, KeyboardEvent, useId, useRef, useState } from 'react';

import ErrorText from '@/components/ui/ErrorText';
import { Input } from '@/components/ui/Input';
import { useClickOutside } from '@/utils/hooks/useClickOutside';
import { cxTw } from '@/utils/utils';

interface InputProps extends ComponentPropsWithoutRef<'input'> {
    label?: {
        value: string;
        className?: string;
    };
    error?: string;
    data: string[];
    acceptedData: string[];
    onAcceptItem: (item: string) => void;
}

const Autocomplete = ({ className, error, data, acceptedData, onAcceptItem, ...props }: InputProps) => {
    const ID = useId();
    const menuRef = useRef<ElementRef<'div'>>(null);

    const [isSugesstionsListOpen, setIsSugesstionsListOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        setInputValue(value);
    };

    const handleSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
        const { key } = e;
        const trimmedInputValue = inputValue.trim();

        if (trimmedInputValue.length === 0 && key === ' ') {
            e.preventDefault();
            return;
        }

        if (key === 'Enter' && trimmedInputValue.length > 0) {
            e.preventDefault();
            if (isExactMatch) {
                const acceptedItem = data[exactMatchIndex];

                onAcceptItem(acceptedItem);

                return;
            }
        }
    };

    const handleAcceptItem = (tag: string) => {
        handleCloseSugesstions();
        onAcceptItem(tag);
        setInputValue('');
    };

    const handleOpenSugesstions = () => setIsSugesstionsListOpen(true);
    const handleCloseSugesstions = () => setIsSugesstionsListOpen(false);

    useClickOutside(menuRef, handleCloseSugesstions);

    const filteredSuggestions = data.filter(
        (item) =>
            item.toLowerCase().includes(inputValue.trim().toLowerCase()) &&
            acceptedData.some((acceptedItem) => acceptedItem.trim().toLowerCase() === item.toLowerCase()) === false
    );

    const exactMatchIndex = filteredSuggestions.findIndex(
        (item) => item.trim().toLowerCase() === inputValue.trim().toLowerCase()
    );

    const isExactMatch = exactMatchIndex !== -1;

    const isInputNotEmpty = inputValue.trim().length > 0;
    const areSuggestionsEmpty = filteredSuggestions.length === 0;
    const areSuggestionsNotEmpty = filteredSuggestions.length > 0;

    const isSuggestionAlreadyAccepted = acceptedData.some(
        (item) => item.trim().toLowerCase() === inputValue.toLowerCase()
    );
    const isSuggestionNotAcceptedYet = isSuggestionAlreadyAccepted === false;

    return (
        <div
            ref={menuRef}
            className={cxTw('relative grid w-full')}
        >
            <Input
                id={ID}
                onChange={handleChange}
                onKeyDown={handleSubmit}
                onFocus={handleOpenSugesstions}
                value={inputValue}
                autoComplete="off"
                {...props}
            />
            <div ref={menuRef}>
                {isSugesstionsListOpen &&
                    (areSuggestionsNotEmpty ||
                        (areSuggestionsEmpty && isInputNotEmpty && isSuggestionNotAcceptedYet)) && (
                        <div
                            className={clsx(
                                'absolute left-0 right-0 z-30 flex max-h-48 w-full flex-col gap-1 overflow-hidden overflow-y-auto border border-t-0 border-neutral-300 bg-white'
                            )}
                        >
                            {filteredSuggestions.map((item, index) => (
                                <button
                                    key={item}
                                    className={clsx(
                                        'select-none items-center rounded-sm px-3 py-1.5 text-left text-sm hover:bg-neutral-100',
                                        exactMatchIndex === index && 'font-semibold'
                                    )}
                                    type="button"
                                    onClick={() => handleAcceptItem(item)}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    )}
            </div>
            {error && <ErrorText>{error}</ErrorText>}
        </div>
    );
};

export default Autocomplete;

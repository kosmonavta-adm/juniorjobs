'use client';

import { useQuery } from '@tanstack/react-query';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { getTags } from '@/components/juniors/juniors.queries';
import Autocomplete from '@/components/ui/Autocomplete';
import Chip from '@/components/ui/Chip';
import { createClient } from '@/supabase/client';

const Filters = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const supabase = createClient();
    const tags = useQuery(getTags(supabase));
    const [acceptedTags, setAcceptedTags] = useState<never[] | string[]>(() => Array.from(searchParams.values()));

    const handleAcceptTag = (tag: string) => {
        setAcceptedTags((prevAcceptedTags) => [...prevAcceptedTags, tag]);
    };

    const handleDeleteTag = (tagToDelete: string) => {
        setAcceptedTags((prevAcceptedTags) => prevAcceptedTags.filter((acceptedTag) => acceptedTag !== tagToDelete));
    };

    const handleAcceptFilterChange = () => {
        const newSearchParams = new URLSearchParams();

        acceptedTags.forEach((value, index) => {
            newSearchParams.set(`t${index}`, value);
        });

        const urlToPush = `${pathname}?${newSearchParams.toString()}`;

        window.history.replaceState(null, '', urlToPush);
    };

    const paramsToCheck = acceptedTags.length;

    useEffect(() => handleAcceptFilterChange(), [paramsToCheck]);

    return (
        <div className="mx-auto flex w-1/2 flex-1 flex-col items-center gap-2">
            <div className="flex w-full gap-2">
                <Autocomplete
                    placeholder="Start typing your tech stack"
                    data={tags.data ?? []}
                    acceptedData={acceptedTags}
                    onAcceptItem={handleAcceptTag}
                />
            </div>
            <div className="flex flex-wrap gap-2">
                {acceptedTags.map((tag) => (
                    <Chip
                        key={tag}
                        size="md"
                        variant="light"
                        value={tag}
                        onDelete={() => handleDeleteTag(tag)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Filters;

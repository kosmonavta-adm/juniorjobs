'use client';

import { useEffect } from 'react';

import { createClient } from '@/supabase/client';

type PeekAtJuniorProps = {
    id: number;
    handleSetNewJuniors: () => void;
};

const PeekAtJunior = ({ id, handleSetNewJuniors }: PeekAtJuniorProps) => {
    const supabase = createClient();

    const handlePeekAtJunior = async () => {
        await supabase.rpc('increment', { row_id: id });
    };

    useEffect(() => {
        supabase
            .channel('table-db-changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'portfolios',
                },
                () => {
                    handleSetNewJuniors();
                }
            )
            .subscribe();
    }, []);

    return <button onClick={handlePeekAtJunior}>Peek</button>;
};

export default PeekAtJunior;

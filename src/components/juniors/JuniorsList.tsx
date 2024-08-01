'use client';

import { useState } from 'react';

import PeekAtJunior from '@/components/juniors/PeekAtJunior';
import { createClient } from '@/supabase/client';
import { Tables } from '@/utils/dbTypes';

type JuniorsListProps = {
    data: Tables<'portfolios'>[];
};

const JuniorsList = ({ data }: JuniorsListProps) => {
    const supabase = createClient();
    const [juniors, setJuniors] = useState<Tables<'portfolios'>[]>(data);
    const handleSetNewJuniors = async () => {
        const { data } = await supabase.from('portfolios').select('*');
        setJuniors(data as Tables<'portfolios'>[]);
    };
    return juniors?.map((junior) => (
        <div
            className="border border-neutral-100 p-4"
            key={junior.id}
        >
            <p>Fullname: {junior.full_name}</p>
            <p>Peek count: {junior.peek_count}</p>
            <PeekAtJunior
                handleSetNewJuniors={handleSetNewJuniors}
                id={junior.id}
            />
        </div>
    ));
};

export default JuniorsList;

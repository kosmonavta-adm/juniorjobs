'use client';

import { useState } from 'react';

import { getEmailAction } from '@/components/juniors/_juniorsServerActions';
import { useCreatePeek } from '@/components/juniors/juniors.mutations';
import Button from '@/components/ui/Button';

type PeekAtJuniorProps = {
    juniorId: number;
    juniorEmail: string;
};

const PeekAtPortfolio = ({ juniorId, juniorEmail }: PeekAtJuniorProps) => {
    const createPeek = useCreatePeek();
    const [isDisabled, setIsDisabled] = useState(false);
    const [email, setEmail] = useState<undefined | string>(juniorEmail);

    const handlePeekAtJunior = async () => {
        setIsDisabled(true);
        await createPeek.mutateAsync(juniorId);

        const data = await getEmailAction(juniorId);
        setEmail(data?.email);
    };

    return email === undefined ? (
        <Button
            className="ml-auto"
            disabled={isDisabled}
            onClick={handlePeekAtJunior}
        >
            Get contact
        </Button>
    ) : (
        <p className="ml-auto">{email}</p>
    );
};

export default PeekAtPortfolio;

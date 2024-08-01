import { redirect } from 'next/navigation';

import JuniorsList from '@/components/juniors/JuniorsList';
import { createClient } from '@/supabase/server';
import { Tables } from '@/utils/dbTypes';
import { url } from '@/utils/utils';

export default async function WelcomePage() {
    const supabase = createClient();

    const { data } = await supabase.auth.getUser();

    if (data?.user === null) {
        redirect(url.login);
    }

    const juniors = await supabase.from('portfolios').select('*');

    return (
        <div className="grid p-8">
            <JuniorsList data={juniors.data as Tables<'portfolios'>[]} />
        </div>
    );
}

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { redirect } from 'next/navigation';

import { getJuniors } from '@/components/juniors/juniors.queries';
import JuniorsList from '@/components/juniors/JuniorsList';
import { createClient } from '@/supabase/server';
import { url } from '@/utils/utils';

export default async function WelcomePage() {
    const supabase = createClient();

    const { data } = await supabase.auth.getUser();

    if (data?.user === null) {
        redirect(url.login);
    }

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(getJuniors(supabase));

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="grid p-8">
                <JuniorsList />
            </div>
        </HydrationBoundary>
    );
}

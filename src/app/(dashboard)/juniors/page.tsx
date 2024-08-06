import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import Filters from '@/components/juniors/Filters';
import { getJuniors, getTags } from '@/components/juniors/juniors.queries';
import JuniorsList from '@/components/juniors/JuniorsList';
import Loader from '@/components/ui/Loader';
import { createClient } from '@/supabase/server';
import { url } from '@/utils/utils';

export default async function WelcomePage() {
    const supabase = createClient();

    const { data } = await supabase.auth.getUser();

    if (data?.user === null) {
        redirect(url.login);
    }

    const queryClient = new QueryClient();
    await Promise.allSettled([
        queryClient.prefetchQuery(getJuniors(supabase)),
        queryClient.prefetchQuery(getTags(supabase)),
    ]);

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="flex flex-col gap-8 p-8">
                <Suspense fallback={<Loader />}>
                    <Filters />
                </Suspense>
                <Suspense fallback={<Loader />}>
                    <JuniorsList />
                </Suspense>
            </div>
        </HydrationBoundary>
    );
}

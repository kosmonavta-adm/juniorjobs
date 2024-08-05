import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { redirect } from 'next/navigation';

import { getJuniors, getPeeks } from '@/components/juniors/juniors.queries';
import JuniorsList from '@/components/juniors/JuniorsList';
import PostPortfolio from '@/components/juniors/PostPortfolio';
import TagsCloud from '@/components/juniors/TagsCloud';
import { createClient } from '@/supabase/server';
import { url } from '@/utils/utils';

export default async function WelcomePage() {
    const supabase = createClient();

    const session = await supabase.auth.getUser();

    if (session.data.user === null) {
        redirect(url.login);
    }

    const queryClient = new QueryClient();

    await Promise.all([queryClient.prefetchQuery(getJuniors(supabase)), queryClient.prefetchQuery(getPeeks(supabase))]);

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="mx-auto flex min-h-svh max-w-screen-4xl flex-col gap-16 px-8 py-16 md:px-16 md:py-32 2xl:px-32">
                <div className="flex justify-between">
                    <PostPortfolio />
                    <TagsCloud />
                </div>
                <div className="flex flex-col gap-8">
                    <p className="text-4xl font-bold text-purple-500">Newest Juniors</p>
                    <JuniorsList />
                </div>
            </div>
        </HydrationBoundary>
    );
}

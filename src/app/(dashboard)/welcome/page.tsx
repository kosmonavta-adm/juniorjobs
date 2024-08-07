import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { redirect } from 'next/navigation';

import { getJuniors, getPortfolio, getUserPeeks } from '@/components/juniors/juniors.queries';
import JuniorsList from '@/components/juniors/JuniorsList';
import PortfolioQuickInfo from '@/components/juniors/PortfolioQuickInfo';
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

    await Promise.all([
        queryClient.prefetchQuery(getJuniors(supabase)),
        queryClient.prefetchQuery(getUserPeeks(supabase, session.data.user.id)),
        queryClient.prefetchQuery(getPortfolio(supabase, session.data.user.id)),
    ]);

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="mx-auto flex min-h-svh max-w-screen-4xl flex-col gap-16 px-8 py-16 md:px-16 md:py-32 2xl:px-32">
                <div className="flex justify-between">
                    <div className="flex min-h-[750px] w-full max-w-3xl flex-col gap-16 self-start bg-purple-500 p-16">
                        <PortfolioQuickInfo userId={session.data.user.id} />
                    </div>
                    <TagsCloud />
                </div>
                <div className="flex flex-col gap-8">
                    <p className="text-4xl font-bold text-purple-500">Newest Juniors</p>
                    <JuniorsList userId={session.data.user.id} />
                </div>
            </div>
        </HydrationBoundary>
    );
}

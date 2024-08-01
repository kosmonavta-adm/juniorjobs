import Link from 'next/link';

import PostPortfolio from '@/components/portfolio/PostPortfolio';
import Button from '@/components/ui/Button';
import { url } from '@/utils/utils';

export default async function WelcomePage() {
    // const supabase = createClient();

    // const { data } = await supabase.auth.getUser();

    // if (data?.user) {
    //     redirect(url.dashboard);
    // }

    return (
        <div className="grid h-[calc(100svh-96px)] min-h-0 grid-cols-1 lg:grid-cols-2">
            <article className="flex flex-col gap-16 p-16">
                <p className="mt-0 text-center text-5xl font-bold">
                    Do you want to <span className="bg-purple-800 px-2 py-1 text-white">give</span> someone a job?
                </p>
                <Button
                    className="mx-auto"
                    size="lg"
                    asChild
                >
                    <Link href={url.candidates}>Browse candidates</Link>
                </Button>
            </article>
            <article className="flex flex-col gap-8 p-16">
                <p className="text-center text-5xl font-bold">
                    <span className="bg-purple-800 px-2 py-1 text-white">Looking</span> for a job? Post your portfolio!
                </p>
                <PostPortfolio />
            </article>
        </div>
    );
}

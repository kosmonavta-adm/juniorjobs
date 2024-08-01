import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { createClient } from '@/supabase/server';
import { url } from '@/utils/utils';

export const metadata: Metadata = {
    title: 'Junior Jobs | Login',
    description:
        'Junior Jobs connects young talent with top employers. Explore thousands of entry-level opportunities and kickstart your career today!',
};

export default async function LoginPage() {
    const supabase = createClient();

    const { data } = await supabase.auth.getUser();

    if (data?.user) {
        redirect(url.dashboard);
    }

    return <main className="grid min-h-svh grid-cols-1 lg:grid-cols-2">Landing page</main>;
}

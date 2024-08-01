import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import LoginForm from '@/components/auth/LoginForm';
import Logo from '@/components/ui/Logo';
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

    return (
        <main className="grid min-h-svh grid-cols-1 lg:grid-cols-2">
            <div className="relative hidden lg:flex">
                <div className="z-10 flex h-full w-full bg-purple-800">
                    <Logo className="absolute ml-8 mt-8" />
                    <p className="m-auto text-6xl text-white">Nice to see you again!</p>
                </div>
            </div>
            <div className="flex flex-col items-center p-4">
                <LoginForm />
            </div>
        </main>
    );
}

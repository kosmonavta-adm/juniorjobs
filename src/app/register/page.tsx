import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import RegisterForm from '@/components/auth/RegisterForm';
import Logo from '@/components/ui/Logo';
import { createClient } from '@/supabase/server';
import { url } from '@/utils/utils';

export const metadata: Metadata = {
    title: 'Junior Jobs | Register',
    description:
        'Junior Jobs connects young talent with top employers. Explore thousands of entry-level opportunities and kickstart your career today!',
};

export default async function RegisterPage() {
    const supabase = createClient();

    const { data } = await supabase.auth.getUser();

    if (data?.user) {
        redirect(url.welcome);
    }

    return (
        <main className="grid min-h-svh grid-cols-1 lg:grid-cols-2">
            <div className="hidden lg:flex">
                <div className="z-10 flex h-full w-full bg-purple-800">
                    <Logo
                        variant="light"
                        className="ml-8 mt-8"
                    />
                </div>
            </div>
            <div className="flex flex-col items-center p-4">
                <RegisterForm />
            </div>
        </main>
    );
}

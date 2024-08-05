import { redirect } from 'next/navigation';

import UpdatePassword from '@/components/auth/UpdatePassword';
import Logo from '@/components/ui/Logo';
import { createClient } from '@/supabase/server';
import { url } from '@/utils/utils';

export default async function PrivatePage() {
    const supabase = createClient();

    const { data, error } = await supabase.auth.getUser();

    if (error || !data?.user) {
        redirect(url.login);
    }

    return (
        <main className="grid min-h-svh grid-cols-1 lg:grid-cols-2">
            <div className="hidden lg:flex">
                <div className="z-10 flex h-full w-full bg-purple-500">
                    <Logo
                        variant="light"
                        className="ml-8 mt-8"
                    />
                </div>
            </div>
            <div className="flex flex-col items-center p-4">
                <UpdatePassword />
            </div>
        </main>
    );
}

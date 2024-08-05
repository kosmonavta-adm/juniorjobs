import { Metadata } from 'next';

import ForgotPassword from '@/components/auth/ForgotPassword';
import Logo from '@/components/ui/Logo';

export const metadata: Metadata = {
    title: 'Junior Jobs | Forgot Password',
    description:
        'Junior Jobs connects young talent with top employers. Explore thousands of entry-level opportunities and kickstart your career today!',
};

export default function ForgotPasswordPage() {
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
                <ForgotPassword />
            </div>
        </main>
    );
}

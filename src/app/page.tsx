import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { UnThoughts } from '@/components/icons';
import Logo from '@/components/ui/Logo';
import { url } from '@/utils/utils';

export const metadata: Metadata = {
    title: 'Junior Jobs',
    description:
        'Junior Jobs connects young talent with top employers. Explore thousands of entry-level opportunities and kickstart your career today!',
};

export default async function LandingPage() {
    return (
        <main>
            <div className="flex min-h-svh flex-col bg-neutral-50">
                <nav className="flex justify-between p-12">
                    <Logo variant="dark" />
                    <menu className="flex gap-8">
                        <li>
                            <Link href={url.register}>Register</Link>
                        </li>
                        <li>
                            <Link href={url.login}>Login</Link>
                        </li>
                    </menu>
                </nav>
                <div className="m-auto flex flex-col items-center justify-evenly gap-12 self-center p-8 lg:flex-row xl:max-w-screen-lg 2xl:max-w-screen-xl 4xl:max-w-screen-3xl">
                    <h1 className="max-w-[15ch] text-balance text-center text-8xl lg:text-left 2xl:text-9xl">
                        This time, let the job find <span className="font-bold text-purple-500">YOU.</span>
                    </h1>
                    <div className="relative mx-auto flex aspect-square w-full min-w-64 max-w-3xl self-end object-cover">
                        <Image
                            alt="Flying birds"
                            fill={true}
                            src="/bg.jpg"
                        />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 items-center justify-center gap-12 bg-purple-500 px-8 py-16 md:px-16 md:py-32 xl:grid-cols-2 2xl:px-32 2xl:py-64 4xl:px-64">
                <div>
                    <h2 className="mb-8 w-fit text-5xl font-bold text-white">The Process</h2>
                    <p className="max-w-[40ch] text-2xl leading-relaxed text-white sm:text-3xl sm:leading-relaxed md:text-4xl md:leading-relaxed">
                        Remember all those times when a company didn&apos;t bother to give you feedback after an
                        interview? Ghosting is, unfortunately, a common practice. We are changing the rules. Let your
                        best projects speak for you. Let entrepreneurs to partner with you based on your skills and
                        knowledge.
                    </p>
                </div>
                <UnThoughts className="mx-auto max-h-96 xl:h-96" />
            </div>
            <div className="grid grid-cols-1 items-center justify-center gap-12 px-8 py-16 md:px-16 md:py-32 xl:grid-cols-2 2xl:px-32 2xl:py-64 4xl:px-64">
                <h2 className="mb-8 w-fit text-balance text-7xl font-bold sm:text-8xl">Free For Everyone</h2>
                <p className="max-w-[50ch] text-3xl leading-relaxed sm:text-4xl sm:leading-relaxed">
                    Are you a SaaS company? A solopreneur? It doesn&apos;t matter. With us, you can find the right
                    people for your job for free.
                </p>
            </div>
            <div className="flex bg-neutral-50 px-8 py-16 md:px-16 md:py-32 xl:grid-cols-2 2xl:px-32 2xl:py-64 4xl:px-64">
                <Link
                    className="mx-auto text-balance text-center text-9xl font-bold leading-snug text-purple-600 underline decoration-wavy decoration-4 underline-offset-4 hover:text-purple-800"
                    href={url.register}
                >
                    Give it a try!
                </Link>
            </div>
            <footer className="flex justify-center bg-neutral-50 py-8">
                <p className="inline-flex gap-2">
                    <span>©</span>
                    {new Date().getFullYear()} - Junior Jobs
                </p>
            </footer>
        </main>
    );
}

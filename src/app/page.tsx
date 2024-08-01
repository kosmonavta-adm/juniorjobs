import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Junior Jobs',
    description:
        'Junior Jobs connects young talent with top employers. Explore thousands of entry-level opportunities and kickstart your career today!',
};

export default async function LandingPage() {
    return <main className="grid min-h-svh grid-cols-1 lg:grid-cols-2">Landing page</main>;
}

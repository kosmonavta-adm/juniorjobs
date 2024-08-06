'use client';

import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import { getJuniors, getPeeks } from '@/components/juniors/juniors.queries';
import PeekAtPortfolio from '@/components/juniors/PeekAtJunior';
import Chip from '@/components/ui/Chip';
import CustomLink from '@/components/ui/CustomLink';
import Loader from '@/components/ui/Loader';
import { createClient } from '@/supabase/client';

type JuniorsListProps = {
    limit?: number;
};

const JuniorsList = ({ limit = Infinity }: JuniorsListProps) => {
    const supabase = createClient();
    const juniors = useQuery(getJuniors(supabase));
    const peeks = useQuery(getPeeks(supabase));
    const searchParams = useSearchParams();

    if (juniors.isFetching) return <Loader />;

    const peeksLookup = peeks.data?.reduce((result, item) => {
        if (item.junior === null) return result;
        result.set(item.junior.id, item.junior.email);

        return result;
    }, new Map());

    return (
        <div className="grid grid-cols-2 gap-2">
            {juniors.data
                ?.slice(0, limit)
                .filter((junior) => {
                    const tags = new Set();

                    for (let i = 0; i < 10; i++) {
                        const tagKey = `tag_${i}` as keyof typeof junior;
                        if (junior[tagKey] === null) continue;
                        tags.add(junior[tagKey] as string);
                    }

                    return Array.from(searchParams.values()).every((tag) => tags.has(tag));
                })
                .map((junior) => {
                    const tags = [];
                    const projects = [];

                    for (let i = 0; i < 10; i++) {
                        const tagKey = `tag_${i}` as keyof typeof junior;
                        if (junior[tagKey] === null) continue;
                        tags.push(junior[tagKey] as string);
                    }

                    for (let i = 0; i < 5; i++) {
                        const projectKey = `projectUrl_${i}` as keyof typeof junior;
                        if (junior[projectKey] === null) continue;
                        projects.push(junior[projectKey] as string);
                    }

                    return (
                        <div
                            className="flex flex-col gap-2 border border-neutral-100 p-4"
                            key={junior.id}
                        >
                            <p className="text-lg font-bold">{junior.fullName}</p>
                            <p>{junior.about}</p>
                            <div>
                                <p className="font-bold">Projects</p>

                                <ul>
                                    {projects.map((projectUrl) => (
                                        <li key={projectUrl}>
                                            <CustomLink
                                                target="_blank"
                                                href={projectUrl}
                                            >
                                                {projectUrl}
                                            </CustomLink>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <p className="font-bold">Skills</p>
                                <div className="flex gap-2">
                                    {tags.map((tag) => (
                                        <Chip
                                            variant="light"
                                            key={tag}
                                            size="sm"
                                            value={tag}
                                        />
                                    ))}
                                </div>
                            </div>

                            <PeekAtPortfolio
                                juniorEmail={peeksLookup?.get(junior.id)}
                                juniorId={junior.id}
                            />
                        </div>
                    );
                })}
        </div>
    );
};

export default JuniorsList;

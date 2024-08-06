'use client';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import { getJuniors } from '@/components/juniors/juniors.queries';
import Button from '@/components/ui/Button';
import Chip from '@/components/ui/Chip';
import { createClient } from '@/supabase/client';
import { url } from '@/utils/utils';

const TagsCloud = () => {
    const supabase = createClient();

    const juniors = useQuery(getJuniors(supabase));

    const tags = juniors.data?.reduce<Map<string, number>>((result, portfolio) => {
        for (let i = 0; i < 10; i++) {
            const tagKey = `tag_${i}` as
                | 'tag_0'
                | 'tag_1'
                | 'tag_2'
                | 'tag_3'
                | 'tag_4'
                | 'tag_5'
                | 'tag_6'
                | 'tag_7'
                | 'tag_8'
                | 'tag_9';

            if (portfolio[tagKey] === null) {
                return result;
            }
            if (result.has(portfolio[tagKey])) {
                const currentCount = result.get(portfolio[tagKey]) ?? 1;

                result.set(portfolio[tagKey], currentCount + 1);
            } else {
                result.set(portfolio[tagKey], 1);
            }
        }

        return result;
    }, new Map());

    if (tags === undefined) return null;

    return (
        <div className="flex max-w-2xl flex-col gap-8 rounded-full">
            <p className="text-center text-4xl font-bold text-purple-500">Find best people for your job</p>

            <div className="flex flex-wrap gap-2">
                {Array.from(tags)
                    .slice(0, 50)
                    .sort(([_, tagACount], [__, tagBCount]) => tagBCount - tagACount)
                    .map(([tag, tagCount]) => (
                        <Link
                            key={tag}
                            href={`${url.juniors}?t0=${tag}`}
                        >
                            <Chip
                                variant="light"
                                value={
                                    <>
                                        {tag} ({tagCount})
                                    </>
                                }
                            />
                        </Link>
                    ))}
            </div>
            <Button
                asChild
                className="mx-auto"
            >
                <Link href={url.juniors}>See more</Link>
            </Button>
        </div>
    );
};

export default TagsCloud;

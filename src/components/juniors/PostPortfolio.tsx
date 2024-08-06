'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useCreatePortfolio, useUpdateProfile } from '@/components/juniors/juniors.mutations';
import { getTags } from '@/components/juniors/juniors.queries';
import Autocomplete from '@/components/ui/Autocomplete';
import Button from '@/components/ui/Button';
import Chip from '@/components/ui/Chip';
import { Input } from '@/components/ui/Input';
import Loader from '@/components/ui/Loader';
import Textarea from '@/components/ui/Textarea';
import { createClient } from '@/supabase/client';
import { cxTw } from '@/utils/utils';

const PostPortfolio = () => {
    const supabase = createClient();

    const tags = useQuery(getTags(supabase));

    const createPortfolio = useCreatePortfolio();
    const updateProfile = useUpdateProfile();

    const PORTFOLIO = {
        FULL_NAME: 'fullName',
        PROJECTS: 'projects',
        ABOUT: 'about',
        EMAIL: 'email',
        PROJECT_URL: 'url',
    } as const;

    const MAX_ABOUT_YOU_LENGTH = 160;
    const MAX_ACCEPTED_TAGS = 10;

    const [acceptedTags, setAcceptedTags] = useState<never[] | string[]>([]);

    const handleAcceptTag = (tag: string) => {
        if (acceptedTags.length === MAX_ACCEPTED_TAGS) return;
        setAcceptedTags((prevAcceptedTags) => [...prevAcceptedTags, tag]);
    };

    const handleDeleteTag = (tagToDelete: string) => {
        setAcceptedTags((prevAcceptedTags) => prevAcceptedTags.filter((tag) => tag !== tagToDelete));
    };

    const portfolioSchema = z.object({
        [PORTFOLIO.FULL_NAME]: z.string().min(1),
        [PORTFOLIO.ABOUT]: z.string().min(1).max(MAX_ABOUT_YOU_LENGTH),
        [PORTFOLIO.PROJECTS]: z.array(z.object({ [PORTFOLIO.PROJECT_URL]: z.string().url() })),
    });

    const { register, handleSubmit, formState, control, watch } = useForm({
        resolver: zodResolver(portfolioSchema),
        defaultValues: {
            [PORTFOLIO.FULL_NAME]: '',
            [PORTFOLIO.ABOUT]: '',
            [PORTFOLIO.PROJECTS]: [{ [PORTFOLIO.PROJECT_URL]: '' }],
        },
    });

    const descriptionLength = watch(PORTFOLIO.ABOUT).length;

    const { append, fields, remove } = useFieldArray({ control, name: PORTFOLIO.PROJECTS });

    if (tags.isFetching || tags.data === undefined) return <Loader />;

    const handleSubmitPortfolio = async (data: z.infer<typeof portfolioSchema>) => {
        const projectUrlsToAdd = data.projects.reduce(
            (result, item, index) => {
                result = { ...result, [`project_url_${index}`]: item.url };

                return result;
            },
            { project_url_0: '' }
        );

        const tagsToAdd = acceptedTags.reduce(
            (result, item, index) => {
                result = { ...result, [`tag_${index}`]: item };

                return result;
            },
            { tag_0: '' }
        );

        const parsedData = {
            full_name: data.fullName,
            about: data.about,
            ...projectUrlsToAdd,
            ...tagsToAdd,
        };

        const { id: portfolioId } = await createPortfolio.mutateAsync(parsedData);
        updateProfile.mutate({ portfolio_id: portfolioId });
    };

    const isNoTagsAdded = acceptedTags.every((tag) => tag.trim().length === 0);

    return (
        <>
            <p className="text-center text-4xl font-bold text-white">Looking for a job? Post your portfolio!</p>
            <form
                onSubmit={handleSubmit(handleSubmitPortfolio)}
                className="grid gap-6"
            >
                <Input
                    className="bg-neutral-50"
                    label={{ value: 'Full Name', className: 'text-white' }}
                    {...register(PORTFOLIO.FULL_NAME)}
                />
                <div>
                    {fields.map((field, index) => (
                        <Input
                            className={cxTw('bg-neutral-50', index === fields.length - 1 ? 'mb-2' : 'mb-6')}
                            label={{ value: `Project URL #${index + 1}`, className: 'text-white' }}
                            placeholder="https://www.example.com"
                            key={field.id}
                            {...register(`${PORTFOLIO.PROJECTS}.${index}.${PORTFOLIO.PROJECT_URL}`)}
                        />
                    ))}

                    <div className="flex justify-between">
                        {fields.length <= 4 && (
                            <Button
                                size="sm"
                                type="button"
                                variant="ghost"
                                className="px-0 text-white hover:text-neutral-100"
                                onClick={() => append({ [PORTFOLIO.PROJECT_URL]: '' })}
                            >
                                Add project URL
                            </Button>
                        )}
                        {fields.length > 1 && (
                            <Button
                                className="ml-auto px-0 text-white hover:text-neutral-100"
                                type="button"
                                variant="ghost"
                                onClick={() => remove(fields.length - 1)}
                            >
                                Remove project
                            </Button>
                        )}
                    </div>
                </div>
                <Textarea
                    rows={2}
                    className="bg-neutral-50"
                    label={{ value: 'About you', className: 'text-white' }}
                    {...register(PORTFOLIO.ABOUT)}
                    helperText={
                        <>
                            <span
                                className={cxTw(
                                    'inline-flex w-12 justify-end pr-1 text-white',
                                    descriptionLength > MAX_ABOUT_YOU_LENGTH && 'font-bold text-red-500'
                                )}
                            >
                                {descriptionLength}
                            </span>
                            <span className="inline-flex text-white">{` / ${MAX_ABOUT_YOU_LENGTH}`}</span>
                        </>
                    }
                />
                <div className="flex flex-col gap-2">
                    <Autocomplete
                        label={{ value: 'Technologies', className: 'text-white' }}
                        data={tags.data}
                        acceptedData={acceptedTags}
                        onAcceptItem={handleAcceptTag}
                    />
                    <div className="flex flex-wrap gap-2">
                        {acceptedTags.map((tag) => (
                            <Chip
                                key={tag}
                                size="sm"
                                variant="light"
                                value={tag}
                                onDelete={() => handleDeleteTag(tag)}
                            />
                        ))}
                    </div>
                    <p className="ml-auto text-white">
                        {`
                            ${acceptedTags.length} / ${MAX_ACCEPTED_TAGS}
                            `}
                    </p>
                </div>
                <Button
                    type="submit"
                    variant="ghost"
                    disabled={formState.isValid === false && isNoTagsAdded}
                    className="ml-auto px-0 text-white hover:text-neutral-100 disabled:cursor-not-allowed disabled:text-neutral-300"
                >
                    Submit your portfolio
                </Button>
            </form>
        </>
    );
};

export default PostPortfolio;

'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import { createClient } from '@/supabase/client';
import { cxTw } from '@/utils/utils';

const PostPortfolio = () => {
    const supabase = createClient();

    const PORTFOLIO = {
        FULL_NAME: 'fullName',
        PROJECTS: 'projects',
        DESCRIPTION: 'description',
        PROJECT_URL: 'url',
    } as const;

    const MAX_DESCRIPTION_LENGTH = 256;

    const portfolioSchema = z.object({
        [PORTFOLIO.FULL_NAME]: z.string().min(1),
        [PORTFOLIO.DESCRIPTION]: z.string().min(1).max(MAX_DESCRIPTION_LENGTH),
        [PORTFOLIO.PROJECTS]: z.array(z.object({ [PORTFOLIO.PROJECT_URL]: z.string().min(1) })),
    });

    const { register, handleSubmit, formState, control, watch } = useForm({
        resolver: zodResolver(portfolioSchema),
        defaultValues: {
            [PORTFOLIO.FULL_NAME]: '',
            [PORTFOLIO.DESCRIPTION]: '',
            [PORTFOLIO.PROJECTS]: [{ [PORTFOLIO.PROJECT_URL]: '' }],
        },
    });

    const descriptionLength = watch(PORTFOLIO.DESCRIPTION).length;

    const { append, fields, remove } = useFieldArray({ control, name: PORTFOLIO.PROJECTS });

    const handleSubmitPortfolio = async (data: z.infer<typeof portfolioSchema>) => {
        const projectUrls = data.projects.reduce((result, item, index) => {
            result = { ...result, [`project_url_${index}`]: item.url };

            return result;
        }, {});
        const parsedData = {
            full_name: data.fullName,
            description: data.description,
            peek_count: 0,
            ...projectUrls,
        };
        supabase.from('portfolios').insert(parsedData);
    };

    return (
        <form
            onSubmit={handleSubmit(handleSubmitPortfolio)}
            className="mx-auto mt-8 grid w-full max-w-screen-sm gap-6"
        >
            <Input
                label={{ value: 'Full Name' }}
                {...register(PORTFOLIO.FULL_NAME)}
            />
            <div>
                {fields.map((field, index) => (
                    <Input
                        className={cxTw(index === fields.length - 1 ? 'mb-2' : 'mb-6')}
                        label={{ value: `Project URL #${index + 1}` }}
                        placeholder="https://www.example.com"
                        key={field.id}
                        {...register(`${PORTFOLIO.PROJECTS}.${index}.${PORTFOLIO.PROJECT_URL}`)}
                    />
                ))}

                <div className="flex justify-between">
                    {fields.length <= 4 && (
                        <Button
                            type="button"
                            onClick={() => append({ [PORTFOLIO.PROJECT_URL]: '' })}
                        >
                            Add project URL
                        </Button>
                    )}
                    <Button
                        className="ml-auto px-0"
                        type="button"
                        variant="ghost"
                        onClick={() => remove(fields.length - 1)}
                    >
                        Remove project
                    </Button>
                </div>
            </div>
            <Textarea
                label={{ value: 'Your description' }}
                {...register(PORTFOLIO.DESCRIPTION)}
                helperText={
                    <>
                        <span
                            className={cxTw(
                                'inline-flex w-12 justify-end pr-1',
                                descriptionLength > MAX_DESCRIPTION_LENGTH && 'font-bold text-red-500'
                            )}
                        >
                            {descriptionLength}
                        </span>
                        <span className="inline-flex w-12">{` / ${MAX_DESCRIPTION_LENGTH}`}</span>
                    </>
                }
            />
            <Button
                type="submit"
                disabled={formState.isValid === false}
                className="ml-auto"
            >
                Submit your portfolio
            </Button>
        </form>
    );
};

export default PostPortfolio;

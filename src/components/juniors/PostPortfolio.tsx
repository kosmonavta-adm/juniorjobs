'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useCreatePortfolio } from '@/components/juniors/juniors.mutations';
import Autocomplete from '@/components/ui/Autocomplete';
import Button from '@/components/ui/Button';
import Chip from '@/components/ui/Chip';
import { Input } from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import { cxTw } from '@/utils/utils';

const PostPortfolio = () => {
    const tags = [
        { id: 0, name: 'Python' },
        { id: 1, name: 'JavaScript' },
        { id: 2, name: 'Java' },
        { id: 3, name: 'C++' },
        { id: 4, name: 'C#' },
        { id: 5, name: 'Ruby' },
        { id: 6, name: 'PHP' },
        { id: 7, name: 'Swift' },
        { id: 8, name: 'Go' },
        { id: 9, name: 'Kotlin' },
        { id: 10, name: 'TypeScript' },
        { id: 11, name: 'R' },
        { id: 12, name: 'HTML' },
        { id: 13, name: 'CSS' },
        { id: 14, name: 'React.js' },
        { id: 15, name: 'Angular' },
        { id: 16, name: 'Vue.js' },
        { id: 17, name: 'Node.js' },
        { id: 18, name: 'Express.js' },
        { id: 19, name: 'Django' },
        { id: 20, name: 'Flask' },
        { id: 21, name: 'Bootstrap' },
        { id: 22, name: 'jQuery' },
        { id: 23, name: 'RESTful APIs' },
        { id: 24, name: 'GraphQL' },
        { id: 25, name: 'Data Analysis' },
        { id: 26, name: 'Machine Learning' },
        { id: 27, name: 'Deep Learning' },
        { id: 28, name: 'Data Visualization' },
        { id: 29, name: 'Data Mining' },
        { id: 30, name: 'Big Data' },
        { id: 31, name: 'Hadoop' },
        { id: 32, name: 'Spark' },
        { id: 33, name: 'TensorFlow' },
        { id: 34, name: 'PyTorch' },
        { id: 35, name: 'Natural Language Processing (NLP)' },
        { id: 36, name: 'Predictive Analytics' },
        { id: 37, name: 'SQL' },
        { id: 38, name: 'NoSQL' },
        { id: 40, name: 'AWS (Amazon Web Services)' },
        { id: 41, name: 'Microsoft Azure' },
        { id: 42, name: 'Google Cloud Platform (GCP)' },
        { id: 45, name: 'Kubernetes' },
        { id: 46, name: 'Docker' },
        { id: 47, name: 'CI/CD (Continuous Integration/Continuous Deployment)' },
        { id: 48, name: 'Serverless Computing' },
        { id: 49, name: 'Terraform' },
        { id: 50, name: 'Cloud Security' },
        { id: 51, name: 'Virtualization' },
        { id: 52, name: 'Network Security' },
        { id: 53, name: 'Information Security' },
        { id: 54, name: 'Ethical Hacking' },
        { id: 55, name: 'Penetration Testing' },
        { id: 58, name: 'Encryption' },
        { id: 64, name: 'SOC (Security Operations Center)' },
        { id: 65, name: 'MySQL' },
        { id: 66, name: 'PostgreSQL' },
        { id: 67, name: 'MongoDB' },
        { id: 68, name: 'Oracle Database' },
        { id: 69, name: 'Microsoft SQL Server' },
        { id: 70, name: 'Database Administration' },
        { id: 71, name: 'Data Modeling' },
        { id: 72, name: 'Database Design' },
        { id: 73, name: 'Redis' },
        { id: 74, name: 'Elasticsearch' },
        { id: 75, name: 'Cassandra' },
        { id: 76, name: 'TCP/IP' },
        { id: 77, name: 'DNS' },
        { id: 78, name: 'DHCP' },
        { id: 99, name: 'Version Control (Git)' },
        { id: 100, name: 'Continuous Integration' },
        { id: 101, name: 'Test-Driven Development (TDD)' },
        { id: 102, name: 'Microservices' },
        { id: 103, name: 'API Development' },
        { id: 104, name: 'Mobile Development (iOS, Android)' },
        { id: 105, name: 'Frontend Development' },
        { id: 106, name: 'Backend Development' },
        { id: 107, name: 'Full Stack Development' },
        { id: 108, name: 'Artificial Intelligence (AI)' },
        { id: 109, name: 'Deep Learning' },
        { id: 110, name: 'Computer Vision' },
        { id: 111, name: 'Robotics' },
        { id: 112, name: 'Automation' },
        { id: 113, name: 'AI Ethics' },
        { id: 114, name: 'Project Management' },
        { id: 115, name: 'PMP (Project Management Professional)' },
        { id: 116, name: 'Risk Management' },
        { id: 117, name: 'Stakeholder Management' },
        { id: 118, name: 'Budgeting' },
        { id: 119, name: 'Resource Management' },
        { id: 120, name: 'Business Intelligence (BI)' },
        { id: 121, name: 'ETL (Extract, Transform, Load)' },
        { id: 122, name: 'Reporting' },
        { id: 123, name: 'Power BI' },
        { id: 124, name: 'Tableau' },
        { id: 125, name: 'Business Analytics' },
        { id: 126, name: 'KPI (Key Performance Indicators)' },
        { id: 127, name: 'Data Governance' },
        { id: 128, name: 'Jenkins' },
        { id: 129, name: 'Ansible' },
        { id: 130, name: 'Puppet' },
        { id: 131, name: 'Chef' },
        { id: 132, name: 'GitLab CI' },
        { id: 133, name: 'Infrastructure as Code (IaC)' },
        { id: 134, name: 'Monitoring & Logging' },
        { id: 135, name: 'Blockchain' },
        { id: 136, name: 'Smart Contracts' },
        { id: 137, name: 'Ethereum' },
        { id: 138, name: 'Bitcoin' },
        { id: 139, name: 'Cryptocurrency' },
        { id: 140, name: 'Decentralized Applications (dApps)' },
        { id: 141, name: 'Hyperledger' },
        { id: 142, name: 'Solidity' },
        { id: 143, name: 'Web3' },
        { id: 144, name: 'Quantum Computing' },
        { id: 145, name: 'Edge Computing' },
        { id: 146, name: '5G Networks' },
        { id: 147, name: 'Internet of Things (IoT)' },
        { id: 148, name: 'Augmented Reality (AR)' },
        { id: 149, name: 'Virtual Reality (VR)' },
        { id: 150, name: 'Mixed Reality (MR)' },
        { id: 151, name: 'Autonomous Systems' },
        { id: 152, name: 'Communication' },
        { id: 153, name: 'Team Collaboration' },
        { id: 154, name: 'Problem Solving' },
        { id: 155, name: 'Critical Thinking' },
        { id: 156, name: 'Time Management' },
        { id: 157, name: 'Adaptability' },
        { id: 158, name: 'Leadership' },
        { id: 159, name: 'Conflict Resolution' },
        { id: 160, name: 'Customer Service' },
        { id: 161, name: 'Documentation' },
    ];

    const createPortfolio = useCreatePortfolio();

    const PORTFOLIO = {
        FULL_NAME: 'fullName',
        PROJECTS: 'projects',
        ABOUT: 'about',
        EMAIL: 'email',
        PROJECT_URL: 'url',
    } as const;

    const MAX_ABOUT_YOU_LENGTH = 160;
    const MAX_ACCEPTED_TAGS = 10;

    const [acceptedTags, setAcceptedTags] = useState<never[] | { id: number; name: string }[]>([]);

    const handleAcceptTag = (tag: { id: number; name: string }) => {
        if (acceptedTags.length === MAX_ACCEPTED_TAGS) return;
        setAcceptedTags((prevAcceptedTags) => [...prevAcceptedTags, tag]);
    };

    const handleDeleteTag = (id: number) => {
        setAcceptedTags((prevAcceptedTags) => prevAcceptedTags.filter((tag) => tag.id !== id));
    };

    const portfolioSchema = z.object({
        [PORTFOLIO.FULL_NAME]: z.string().min(1),
        [PORTFOLIO.EMAIL]: z.string().email(),
        [PORTFOLIO.ABOUT]: z.string().min(1).max(MAX_ABOUT_YOU_LENGTH),
        [PORTFOLIO.PROJECTS]: z.array(z.object({ [PORTFOLIO.PROJECT_URL]: z.string().url() })),
    });

    const { register, handleSubmit, formState, control, watch } = useForm({
        resolver: zodResolver(portfolioSchema),
        defaultValues: {
            [PORTFOLIO.FULL_NAME]: '',
            [PORTFOLIO.ABOUT]: '',
            [PORTFOLIO.EMAIL]: '',
            [PORTFOLIO.PROJECTS]: [{ [PORTFOLIO.PROJECT_URL]: '' }],
        },
    });

    const descriptionLength = watch(PORTFOLIO.ABOUT).length;

    const { append, fields, remove } = useFieldArray({ control, name: PORTFOLIO.PROJECTS });

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
                result = { ...result, [`tag_${index}`]: item.name };

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
        createPortfolio.mutate(parsedData);
    };

    const isNoTagsAdded = acceptedTags.every((tag) => tag.name.trim().length === 0);

    return (
        <div className="flex max-w-3xl flex-col gap-16 self-start bg-purple-500 p-16">
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
                <Input
                    className="bg-neutral-50"
                    label={{ value: 'Contact e-mail', className: 'text-white' }}
                    {...register(PORTFOLIO.EMAIL)}
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
                        data={tags}
                        acceptedData={acceptedTags}
                        onAcceptItem={handleAcceptTag}
                    />
                    <div className="flex flex-wrap gap-2">
                        {acceptedTags.map((tag) => (
                            <Chip
                                key={tag.id}
                                size="sm"
                                variant="light"
                                value={tag.name}
                                onDelete={() => handleDeleteTag(tag.id)}
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
        </div>
    );
};

export default PostPortfolio;

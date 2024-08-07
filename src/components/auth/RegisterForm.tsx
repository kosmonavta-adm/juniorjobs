'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { registerUser } from '@/components/auth/_authActions';
import Button from '@/components/ui/Button';
import CustomLink from '@/components/ui/CustomLink';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/components/ui/Toast/useToast';
import { url } from '@/utils/utils';

export const REGISTER = {
    EMAIL: 'email',
    PASSWORD: 'password',
    CONFIRM_PASSWORD: 'confirmPassword',
} as const;

const RegisterForm = () => {
    const { toast } = useToast();

    const registerSchema = z
        .object({
            [REGISTER.EMAIL]: z.string().email('Email address is incorrect'),
            [REGISTER.PASSWORD]: z.string().min(6, 'The password must have at least 6 characters'),
            [REGISTER.CONFIRM_PASSWORD]: z.string(),
        })
        .refine(
            (values) => {
                return values[REGISTER.PASSWORD] === values[REGISTER.CONFIRM_PASSWORD];
            },
            {
                message: "The passwords don't match",
                path: [REGISTER.CONFIRM_PASSWORD],
            }
        );

    const { register, handleSubmit, formState } = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            [REGISTER.EMAIL]: '',
            [REGISTER.PASSWORD]: '',
            [REGISTER.CONFIRM_PASSWORD]: '',
        },
    });

    const handleRegister = async (formData: z.infer<typeof registerSchema>) => {
        const { confirmPassword: _, ...registerData } = formData;
        const error = await registerUser(registerData);

        if (error === null) toast({ description: 'The confirmation email has been sent. Check your email inbox.' });
        else toast({ description: 'An error occurred, try again later.' });
    };

    return (
        <section className="m-auto flex w-full max-w-md flex-col gap-6 px-4">
            <h1 className="mb-4 text-xl font-bold">Register</h1>
            <form
                onSubmit={handleSubmit(handleRegister)}
                className="flex flex-col gap-6"
            >
                <Input
                    label={{
                        value: (
                            <>
                                <span className="text-red-600">*</span> Email
                            </>
                        ),
                    }}
                    placeholder="example@mail.com"
                    error={formState.errors[REGISTER.EMAIL]?.message}
                    {...register(REGISTER.EMAIL)}
                />
                <Input
                    type="password"
                    label={{
                        value: (
                            <>
                                <span className="text-red-600">*</span> Password
                            </>
                        ),
                    }}
                    error={formState.errors[REGISTER.PASSWORD]?.message}
                    {...register(REGISTER.PASSWORD)}
                />
                <Input
                    type="password"
                    label={{
                        value: (
                            <>
                                <span className="text-red-600">*</span> Confirm password
                            </>
                        ),
                    }}
                    error={formState.errors[REGISTER.CONFIRM_PASSWORD]?.message}
                    {...register(REGISTER.CONFIRM_PASSWORD)}
                />

                <Button
                    className="w-full"
                    type="submit"
                    disabled={formState.isSubmitSuccessful || formState.isSubmitting}
                >
                    Sign Up
                </Button>
            </form>
            <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-6">
                <hr className="my-4" />
                <p className="font-medium">or</p>
                <hr className="my-4" />
            </div>
            <p>
                Do you already have an account?{' '}
                <CustomLink
                    className="font-medium"
                    href={url.login}
                >
                    Sign in
                </CustomLink>
            </p>
        </section>
    );
};

export default RegisterForm;

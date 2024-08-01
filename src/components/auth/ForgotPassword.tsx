"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { resetPassword } from "@/components/auth/_authActions";
import Button from "@/components/ui/Button";
import CustomLink from "@/components/ui/CustomLink";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast/useToast";
import { url } from "@/utils/utils";

const FORGOT_PASSWORD = {
	EMAIL: "email",
} as const;

const forgotPasswordSchema = z.object({
	[FORGOT_PASSWORD.EMAIL]: z.string().email("Email address is incorrect"),
});

export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
	const { toast } = useToast();

	const { register, handleSubmit, formState } = useForm({
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: {
			[FORGOT_PASSWORD.EMAIL]: "",
		},
	});

	const handleForgotPassword = async (formData: ForgotPasswordData) => {
		const error = await resetPassword(formData);

		if (error === null)
			toast({ description: "An email to reset your password has been sent. Check your email inbox." });
		else toast({ description: "An error occurred, try again later." });
	};

	return (
		<section className='m-auto flex w-full max-w-md flex-col gap-6 px-4'>
			<h1 className='mb-4 text-xl font-bold'>Reset password</h1>
			<form onSubmit={handleSubmit(handleForgotPassword)} className='flex flex-col gap-6'>
				<Input
					label={{
						value: (
							<>
								<span className='text-red-600'>*</span> Email
							</>
						),
					}}
					placeholder='adres@mail.pl'
					error={formState.errors[FORGOT_PASSWORD.EMAIL]?.message}
					{...register(FORGOT_PASSWORD.EMAIL)}
				/>

				<div className='flex items-baseline justify-between'>
					<Button className='w-full' type='submit'>
						Reset password
					</Button>
				</div>
			</form>
			<div className='grid grid-cols-[1fr,auto,1fr] items-center gap-6'>
				<hr className='my-4' />
				<p className='font-medium'>or</p>
				<hr className='my-4' />
			</div>
			<p>
				<CustomLink className='font-medium' href={url.login}>
					Login with your password
				</CustomLink>{" "}
				in our app!
			</p>
		</section>
	);
};

export default ForgotPassword;

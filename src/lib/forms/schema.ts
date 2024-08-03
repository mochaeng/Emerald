import { z } from 'zod';
import { type SuperValidated, type Infer } from 'sveltekit-superforms';

export const signInFormSchema = z.object({
	username: z
		.string()
		.min(4, 'Username should be at least 4 characters')
		.max(15, 'Username too big.')
		.refine((value) => /^[a-z0-9_-]+$/.test(value), 'Invalid characters.'),
	password: z.string().min(4).max(20)
});
export type SignInFormSchema = typeof signInFormSchema;
export type SignInFormType = SuperValidated<Infer<SignInFormSchema>>;

export const signUpFormSchema = z
	.object({
		username: z
			.string()
			.min(4, 'Username should be at least 4 characters')
			.max(15, 'Username too big.')
			.refine((value) => /^[a-z0-9_-]+$/.test(value), 'Invalid characters.'),
		email: z.string().email('Please enter a valid e-mail'),
		password: z
			.string()
			.min(4, 'Password should be at least 4 characters')
			.max(20, 'Password too big.'),
		confirmationPassword: z.string().min(4).max(20)
	})
	.superRefine(({ confirmationPassword, password }, ctx) => {
		if (confirmationPassword !== password) {
			ctx.addIssue({
				code: 'custom',
				message: 'The passwords did not match',
				path: ['confirmationPassword']
			});
		}
	});
export type SignUpFormSchema = typeof signUpFormSchema;
export type SignUpFormType = SuperValidated<Infer<SignUpFormSchema>>;

export const postTextSchema = z.object({
	textContent: z.string().min(1).max(144, 'Post could not be greater than 144 characters.')
});
export type PostTextSchema = typeof postTextSchema;
export type PostTextType = SuperValidated<Infer<PostTextSchema>>;

import { z } from 'zod';

const schema = z
    .object({
        password: z
            .string({
                invalid_type_error: 'Password is required.',
                required_error: 'Password is required.',
            })
            .nonempty('Password is required.'),
        confirmationPassword: z
            .string({
                invalid_type_error: 'Confirmation password is required.',
                required_error: 'Confirmation password is required.',
            })
            .nonempty('Confirmation password is required.'),
    })
    .refine((data) => data.password === data.confirmationPassword, {
        message: "Passwords don't match",
        path: ['confirmationPassword'], // path of error
    });
export type ResetPasswordFormSchemaType = z.infer<typeof schema>;

export default schema;

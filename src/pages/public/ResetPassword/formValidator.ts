import { z } from 'zod';

const schema = z
    .object({
        password: z
            .string({
                required_error: 'Password is required.',
            })
            .nonempty('Password is required.'),
        confirmationPassword: z
            .string({
                required_error: 'Confirmation password is required.',
            })
            .nonempty('Confirmation password is required.'),
    })
    .superRefine(({ confirmationPassword, password }, ctx) => {
        if (confirmationPassword !== password) {
            ctx.addIssue({
                code: 'custom',
                message: 'The passwords did not match',
            });
        }
    });
export type ResetPasswordFormSchemaType = z.infer<typeof schema>;

export default schema;

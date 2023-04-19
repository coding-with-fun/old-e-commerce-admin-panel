import { z } from 'zod';

const schema = z.object({
    email: z
        .string({
            invalid_type_error: 'Email is required.',
            required_error: 'Email is required.',
        })
        .nonempty('Email is required.')
        .email('Please enter a valid email address.'),
});
export type ForgotPasswordFormSchemaType = z.infer<typeof schema>;

export default schema;

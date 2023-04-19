import { z } from 'zod';

const schema = z.object({
    email: z
        .string({
            invalid_type_error: 'Email is required.',
            required_error: 'Email is required.',
        })
        .nonempty('Email is required.')
        .email('Please enter a valid email address.'),
    password: z.string({
        required_error: 'Password is required.',
    }),
});
export type SignInFormSchemaType = z.infer<typeof schema>;

export default schema;

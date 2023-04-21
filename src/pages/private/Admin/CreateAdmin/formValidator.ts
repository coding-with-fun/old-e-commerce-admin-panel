import { z } from 'zod';

const schema = z.object({
    name: z.string({
        invalid_type_error: 'Name is required.',
        required_error: 'Name is required.',
    }),
    contactNumber: z
        .string({
            invalid_type_error: 'Contact number is required.',
            required_error: 'Contact number is required.',
        })
        .regex(/^\d{10}$/, 'Please enter a valid contact number.'),
    email: z
        .string({
            invalid_type_error: 'Email is required.',
            required_error: 'Email is required.',
        })
        .email('Please enter a valid email address.'),
    password: z.string({
        invalid_type_error: 'Password is required.',
        required_error: 'Password is required.',
    }),
});
export type EditProfileFormSchemaType = z.infer<typeof schema>;

export default schema;

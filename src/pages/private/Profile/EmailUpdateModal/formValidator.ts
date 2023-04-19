import { z } from 'zod';

const schema = z.object({
    email_modal: z
        .string({
            invalid_type_error: 'Email is required.',
            required_error: 'Email is required.',
        })
        .email('Please enter a valid email address.'),
});
export type UpdateEmailModalSchemaType = z.infer<typeof schema>;

export default schema;

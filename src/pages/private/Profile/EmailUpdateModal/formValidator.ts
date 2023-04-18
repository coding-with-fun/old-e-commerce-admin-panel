import { z } from 'zod';

const schema = z.object({
    email_modal: z
        .string({
            required_error: 'Email is required.',
        })
        .email('Please enter a valid email address.'),
});
export type UpdateEmailModalSchemaType = z.infer<typeof schema>;

export default schema;

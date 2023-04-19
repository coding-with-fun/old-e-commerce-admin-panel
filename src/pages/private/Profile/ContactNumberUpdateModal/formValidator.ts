import { z } from 'zod';

const schema = z.object({
    contact_number_modal: z
        .string({
            invalid_type_error: 'Contact number is required.',
            required_error: 'Contact number is required.',
        })
        .nonempty('Contact number is required.')
        .regex(/^\d{10}$/, 'Please enter a valid contact number.'),
});
export type UpdateContactNumberModalSchemaType = z.infer<typeof schema>;

export default schema;

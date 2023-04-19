import { z } from 'zod';

const schema = z.object({
    name: z.string({
        invalid_type_error: 'Name is required.',
        required_error: 'Name is required.',
    }),
});
export type EditProfileFormSchemaType = z.infer<typeof schema>;

export default schema;

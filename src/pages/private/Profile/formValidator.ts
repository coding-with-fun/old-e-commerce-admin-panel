import { z } from 'zod';

const schema = z.object({
    name: z.string({
        required_error: 'Name is required.',
    }),
});
export type EditProfileFormSchemaType = z.infer<typeof schema>;

export default schema;

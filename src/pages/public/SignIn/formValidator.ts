import { z } from 'zod';

const schema = z.object({
    id: z.string({
        required_error: 'Email or Contact number is required.',
    }),
    password: z.string({
        required_error: 'Password is required.',
    }),
});

export default schema;

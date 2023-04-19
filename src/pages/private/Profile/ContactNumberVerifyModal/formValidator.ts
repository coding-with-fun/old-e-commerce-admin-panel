import { z } from 'zod';

const schema = z.object({
    contact_number_modal: z
        .string({
            invalid_type_error: 'Contact number is required.',
            required_error: 'Contact number is required.',
        })
        .nonempty('Contact number is required.')
        .regex(/^\d{10}$/, 'Please enter a valid contact number.'),
    otp_contact_number_modal: z
        .string({
            invalid_type_error: 'OTP is required.',
            required_error: 'OTP is required.',
        })
        .nonempty('OTP is required.')
        .length(4, 'OTP should be of 4 characters only.'),
});
export type VerifyContactNumberModalSchemaType = z.infer<typeof schema>;

export default schema;

import { getRepository } from 'typeorm';
import { registerEmail } from '../services/register-email';
import { getRegisteredEmail } from '../services/get-registered-email';

type RegisteredEmail = {
    id: string;
    email: string;
};

export const queryResolver = {
    async registerEmail({ email }: { email: string }): Promise<RegisteredEmail> {
        const registeredEmail = await registerEmail(email);
        return {
            id: registeredEmail.id,
            email: registeredEmail.email,
        };
    },
    async allRegisteredEmail(): Promise<RegisteredEmail[]> {
        const allRegisteredEmail = await getRegisteredEmail();
        return allRegisteredEmail;
    },
};

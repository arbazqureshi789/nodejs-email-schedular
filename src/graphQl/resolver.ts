import { getRepository } from 'typeorm';
import { registerEmail } from '../services/register-email';
import { getRegisteredEmail } from '../services/get-registered-email';

type RegisteredEmail = {
    id: string;
    email: string;
};

export const queryResolver = {
    async registerEmail({ email }: { email: string }): Promise<RegisteredEmail> {
        try {
            const registeredEmail = await registerEmail(email);
            return {
                id: registeredEmail.id,
                email: registeredEmail.email,
            };
        } catch (error) {
            console.log(error);
        }
    },
    async allRegisteredEmail(): Promise<RegisteredEmail[]> {
        try {
            const allRegisteredEmail = await getRegisteredEmail();
            return allRegisteredEmail;
        } catch (error) {
            console.log(error);
        }
    },
};

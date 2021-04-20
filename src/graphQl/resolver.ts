import { getRepository } from 'typeorm';

type RegisteredEmail = {
    id: string;
    email: string;
};

export const queryResolver = {
    async registerEmail({ email }: { email: string }): Promise<RegisteredEmail> {
        return {
            id: '12345600',
            email: 'arbazqureshi@gmail.com',
        };
    },
    async allRegisteredEmail(): Promise<[RegisteredEmail]> {
        return [
            {
                id: '12345600',
                email: 'arbazqureshi@gmail.com',
            },
        ];
    },
};

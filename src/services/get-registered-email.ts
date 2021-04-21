import { getRepository } from 'typeorm';
import { Email } from '../entities/Email';

export async function getRegisteredEmail(): Promise<Email[]> {
    try {
        const registeredEmails = await getRepository(Email).find();
        return registeredEmails;
    } catch (error) {
        console.log(error);
    }
}
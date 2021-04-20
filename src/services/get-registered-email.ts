import { getRepository } from 'typeorm';
import { Email } from '../entities/Email';

export async function getRegisteredEmail(): Promise<Email[]> {
    const registeredEmails = await getRepository(Email).find();
    return registeredEmails;
}
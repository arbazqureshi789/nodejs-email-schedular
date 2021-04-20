import { getRepository } from 'typeorm';
import { validate } from 'class-validator';
import { Email } from '../entities/Email';

export async function registerEmail(email: string): Promise<Email> {
    const newRegisteredEmail = getRepository(Email).create({
        email: email,
    });
    const errors = await validate(newRegisteredEmail);
    if (errors.length > 0) {
        throw new Error('Invalid Email');
    } else {
        const isDuplicateEmail = await isEmailExist(email);
        if (isDuplicateEmail) {
            throw new Error(`${email} already exist`);
        } else {
            const registerUser = await getRepository(Email).save(newRegisteredEmail);
            return registerUser;
        }
    }
}

async function isEmailExist(email: string): Promise<boolean> {
    const count = await getRepository(Email).count({ where: { email: email } });
    return count ? true : false;
}

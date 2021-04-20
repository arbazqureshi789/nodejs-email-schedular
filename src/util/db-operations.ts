import { getRepository } from 'typeorm';
import { validate } from 'class-validator';
import { Email } from '../model/email-registration';

export class DbOperations {
    private emailRepository = getRepository(Email);

    async registerEmail(email: string): Promise<Email> {
        const checkEmail = await this.isEmailExist(email);
        if (!checkEmail) {
            const newEmail = this.emailRepository.create({
                email: email,
            });

            const errors = await validate(newEmail);
            if (errors.length > 0) {
                throw new Error('Invalid Email');
            } else {
                const registerUser = await this.emailRepository.save(newEmail);
                return registerUser;
            }
        } else {
            throw new Error(`${email} already exist`);
        }
    }

    private async isEmailExist(email: string): Promise<number> {
        const count = await this.emailRepository.count({ where: { email: email } });
        return count;
    }

    async allRegisteredEmail(): Promise<Email[]> {
        const user = await this.emailRepository.find();
        return user;
    }

    async getEmailsToOnboard(): Promise<Email[]> {
        const emails = await this.emailRepository.find({ where: { isEmailSend: false } });
        return emails;
    }
}

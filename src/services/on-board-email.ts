import cron from 'node-cron';
import { createTestAccount, createTransport, getTestMessageUrl } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import schedule, { Job } from 'node-schedule';
import { Email } from '../entities/Email';
import { getRepository } from 'typeorm';

class OnBoardMail {
    private emailQueue: string[] = [];
    private mailTransporter: Mail | undefined;
    private job: Job | undefined;
    public async init() {
        try {
            await this.initializeMailTransport();

            //fetch emails to unsend email address
            const emails = await getRepository(Email).find({ where: { isEmailSend: false } });
            console.log(emails);
            if (emails.length > 0) {
                this.emailQueue = emails.map((e) => e.email);
            }

            this.job = schedule.scheduleJob(
                'Send onboarding mail',
                {
                    second: 10,
                },
                () => this.sendOnboardingMail()
            );
        } catch (error) {
            console.log(error);
        }
    }

    public stop() {
        this.job?.cancel();
    }

    public onboard(email: string) {
        console.log(`Queued ${email} for onboarding mail.`);
        this.emailQueue.push(email);
    }

    private async sendOnboardingMail() {
        try {
            if (this.emailQueue.length > 0) {
                const emails = Array.from(this.emailQueue);
                this.emailQueue = [];

                await Promise.allSettled(emails.map((e) => this.sendMailAndUpdateDB(e)));
            }
        } catch (err) {
            console.error(err);
        }
    }

    private async sendMailAndUpdateDB(email: string): Promise<void> {
        try {
            if (this.mailTransporter !== undefined) {
                const info = await this.mailTransporter.sendMail({
                    from: '"Node Exercise" <exercise@example.com>',
                    to: email,
                    subject: 'Onboard',
                    text: 'Hello. Your email has been registered.',
                    html: '<b>Hello. Your email has been registered.</b>',
                });

                await getRepository(Email).update(
                    {
                        email,
                    },
                    { isEmailSend: true }
                );

                // Log preview URL if using ethereal mail
                if (process.env.USE_ETHEREAL_MAIL === 'true') {
                    console.log(`Email preview URL: ${getTestMessageUrl(info)}`);
                }
            }
        } catch (err) {
            console.error(err);
        }
    }

    private async initializeMailTransport() {
        if (process.env.USE_ETHEREAL_MAIL === 'true') {
            const testAccount = await createTestAccount();
            this.mailTransporter = createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                secure: false,
                auth: {
                    user: testAccount.user,
                    pass: testAccount.pass,
                },
            });
        } else {
            this.mailTransporter = createTransport({
                host: process.env.SMTP_HOST,
                port: Number(process.env.SMTP_PORT),
                secure: Boolean(process.env.SMTP_SECURE),
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASSWORD,
                },
            } as any);
        }
        console.log('initialized mail service');
    }
}

const onboardingMailService = new OnBoardMail();

export default onboardingMailService;

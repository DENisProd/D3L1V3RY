import { createTransport } from 'nodemailer';
import { MAIL_HOST, MAIL_PASS, MAIL_USER } from '../../config';

export interface IBaseMail {
    to: string
    subject: string
    text: string
}

const sendMailTo = async (dto: IBaseMail) => {
    const transporter = createTransport({
        host: MAIL_HOST,
        port: 465,
        secure: true,
        auth: {
            user: MAIL_USER,
            pass: MAIL_PASS,
        },
    });

    const mailOptions = {
        from: MAIL_USER,
        to: dto.to,
        subject: dto.subject,
        html: dto.text,
    };

    try {
        await transporter.sendMail(mailOptions);
        return 'Email sent successfully'
    } catch (error) {
        console.error(error);
        throw new Error("Failed to send email")
    }
}

export default {
    sendMailTo,
}
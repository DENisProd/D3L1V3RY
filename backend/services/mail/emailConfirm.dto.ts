import { IBaseMail } from "./mail.service"

export const createEmailConfirmDTO = ( to: string, code: string ): IBaseMail => {
    const message = {
        to,
        subject: 'Подтвердите адрес электронной почты',
        text: `Пожалуйста, подтвердите свой адрес электронной почты, Введя код: ${code}`
    };

    return message as IBaseMail;
}

// export const createPasswordResetDTO = ( to: string, newPassword: string ): IBaseMail => {
//     const message = {
//         to,
//         subject: 'Сброс пароля',
//         text: `Ваш новый пароль. Никому не сообщайте его: ${newPassword}`
//     }

//     return message as IBaseMail
// }
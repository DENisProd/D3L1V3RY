export function cleanPhoneNumber(phoneNumber: string): string {
    const digitsOnly = phoneNumber.replace(/\D/g, '');
    const formattedNumber = digitsOnly.startsWith('8') ? '+7' + digitsOnly.slice(1) : digitsOnly;
    return formattedNumber.slice(1, 11);
}
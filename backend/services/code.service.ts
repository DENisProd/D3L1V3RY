function generateWord (len : number): string {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < len; ++i) {
        let randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}

function generateCode (len : number): string {
    let code = "";
    for (let i = 0; i < len; i++) {
        code += Math.floor(Math.random() * 10);
    }
    return code;
}

export default {
    generateWord,
    generateCode,
}

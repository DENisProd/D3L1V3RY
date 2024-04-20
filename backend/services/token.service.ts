import { User } from '@prisma/client';
import jwt, { Secret } from 'jsonwebtoken';
import { EXPIRES_IN, JWT_ACCESS_SECRET } from '../config';
import crypto from 'crypto';

function generateClientAccessToken(user: User) {
    return jwt.sign({ userId: user.id, role: user.role }, JWT_ACCESS_SECRET as Secret, {
        expiresIn: EXPIRES_IN,
    });
}

function generateHashToken(length: number) {
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
}

function generateMD5Hash(text: Object) {
    const md5Hash = crypto.createHash('md5');
    return md5Hash.update(JSON.stringify(text)).digest('hex');
}

export default {
    generateClientAccessToken,
    generateHashToken,
    generateMD5Hash,
}
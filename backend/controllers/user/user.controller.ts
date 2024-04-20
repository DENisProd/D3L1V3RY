import { FastifyReply, FastifyRequest } from "fastify";
import bcrypt from "bcrypt";
import userService from "../../services/user/user.service";
import tokenService from "../../services/token.service";
import { LoginInput, RegInput } from "../../routes/user/auth/auth.schema";

import csvService from "../../services/csv.service";

async function login(req: FastifyRequest<{ Body: LoginInput }>, reply: FastifyReply) {
    try {
        const data = req.body;

        if (!data.email || !data.password) return reply.send({ success: false, message: 'Некорректный запрос' });
        const existingUser = await userService.getByEmail(data.email);
        if (!existingUser) return reply.send({ success: false, message: 'Пользователь не найден' });
        const validPassword = bcrypt.compareSync(data.password, existingUser.password);
        if (!validPassword) return reply.send({ success: false, message: 'Неверный логин или пароль' });

        const accessToken = tokenService.generateClientAccessToken(existingUser);
        return reply.send({ success: true, token: accessToken });
    } catch (err) {
        console.log(err);
        return reply.send({ success: false, message: 'error' })
    }
}

async function check(req: FastifyRequest, reply: FastifyReply) {
    try {
        // await csvService.parse('');

        const user = (req as any).user;
        const userFromDb = await userService.getById(user.userId);
        return reply.send({ success: !!userFromDb, role: userFromDb?.role, id: userFromDb.id });
    } catch (err) {
        console.log(err);
        reply.send({ success: false, message: 'error' });
    }
}

async function register(req: FastifyRequest<{ Body: RegInput }>, reply: FastifyReply) {
    try {
        const data = req.body;

        if (!data.email || !data.password) return reply.send({ success: false, message: 'Некорректный запрос' });
        const existingUser = await userService.getByEmail(data.email);

        if (existingUser) return reply.send({ success: false, message: 'Пользователь уже существует' });
        
        const user = await userService.create(data);

        return reply.send({ success: true });
    } catch (err) {
        console.log(err)
        return reply.send({ success: false, message: 'Произошла ошибка' });
    }
}

async function getMyProfile (req: FastifyRequest, reply: FastifyReply) {
    try {
        const user = (req as any).user;
        const client = await userService.getById(user.userId);

        const {password, blocked, createdAt, ...rest} = client;

        return reply.send({ success: true, item: rest});
    } catch (err) {
        console.log(err);
        return reply.send({ success: false, message: "Ошибка при получении профиля"});
    }
}

export default {
    login,
    register,
    check,
    getMyProfile,
}
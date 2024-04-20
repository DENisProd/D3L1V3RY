import { FastifyRequest, FastifyReply, preHandlerHookHandler } from "fastify";
import jwt, { Secret } from "jsonwebtoken";
import { JWT_ACCESS_SECRET } from "../config";
import userService from "../services/user/user.service";
import { UserRole } from "@prisma/client";

async function getUserByToken(token: string) {
    if (!token) return null;
    const secret: Secret = JWT_ACCESS_SECRET;
    const user = jwt.verify(token, secret) as DecodedToken;

    const userFromDb = await userService.getById(user.userId);
    if (!userFromDb) return null;
    if (userFromDb?.blocked) return null;
    return user;
}

export const checkAuthWithoutHeaders = async function (token: string): Promise<DecodedToken | null> {
    try {
        const user = await getUserByToken(token)
        if (!user) return null;
        return user;
    } catch (err) {
        return null;
    }
}

export const checkAuth = async function (req: FastifyRequest): Promise<DecodedToken | null> {
    try {
        const token = req.headers?.authorization || "";
        if (!token) return null;
        const user = await getUserByToken(token)
        if (!user) return null;
        
        return user;
    } catch (err) {
        return null;
    }
}

export const isAuthenticated: preHandlerHookHandler = async function (req: FastifyRequest, res: FastifyReply): Promise<void> {
    const user = await checkAuth(req);
    if (!user) return res.send({ success: false, message: 'error' });
    (req as any).user = user;
};

export const isAuthenticatedSoft: preHandlerHookHandler = async function (req: FastifyRequest, res: FastifyReply): Promise<void> {
    try {
        const user = await checkAuth(req);
        (req as any).user = user;
    } catch (err) {
        console.log(err);
        return;
    }
};

export interface DecodedToken {
    userId: number;
    role: string;
    email: string;
    iat: number;
    exp: number;
    hashToken: string;
}

export function checkAdminRole(user: DecodedToken): boolean {
    return user?.role === UserRole.ADMIN;
}

export function checkDefaultRole(user: DecodedToken): boolean {
    return (user?.role === UserRole.DEFAULT);
}

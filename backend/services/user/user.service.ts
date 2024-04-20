import { User, UserRole, GenderType, Prisma } from "@prisma/client";
import { db } from "../../plugins/db";
import bcrypt from "bcrypt";
import { RegInput } from "../../routes/user/auth/auth.schema";
import { UpdateUserInput } from "../../routes/user/user.schema";

async function create({ password, ...data }: RegInput) {
    const hashedPassword = bcrypt.hashSync(password, 12);
    return db.user.create({
        data: {
            ...data,
            password: hashedPassword,
            role: UserRole.DEFAULT,
        },
    });
}

async function getById(id: number): Promise<User | null> {
    const user = db.user.findUnique({
        where: { 
            id: +id,
        }
    });

    return user;
}

async function getByEmail(email: string): Promise<User | null> {
    const user = db.user.findUnique({
        where: {
            email
        },
    });

    return user;
}

async function getAll(role: UserRole, search?: string | undefined, offset?: number | undefined, limit?: number | undefined): Promise<User[]> {
    
    if (!search) {
        return await db.user.findMany({
            where: { role },
            orderBy: { id: "asc" },
            skip: +offset || 0,
            take: limit > 100 ? 100 : limit
        });
    }
    return await db.user.findMany({
        where: {
            role,
            OR: [
                { id: { equals: +search || -1 } },
                { name: { contains: search, mode: "insensitive" } },
                { email: { contains: search, mode: "insensitive" } },
            ],
        },
        orderBy: { id: "asc" },
        skip: +offset || 0,
        take: limit > 100 ? 100 : limit
    });
}

async function remove(id: number): Promise<User | null> {
    return db.user.delete({
        where: { id: +id },
    });
}

async function updatePassword(id: number, password: string): Promise<boolean> {
    const hashedPassword = bcrypt.hashSync(password, 12);
    const updatedUser = await db.user.update({
        where: { id: +id },
        data: {
            password: hashedPassword,
        }
    });
    return !!updatedUser;
}

async function update(data: UpdateUserInput, isAdmin?: boolean) {
    const existingClient = await db.user.findUnique({
        where: { id: +data.id },
    });

    if (!existingClient) return null;

    const updatedData: Prisma.UserUpdateInput = {};
    if (isAdmin && data.email !== undefined) {
        updatedData.email = data.email;
    }
    if (data.name !== undefined) {
        updatedData.name = data.name;
    }
    if (data.birthday !== undefined) {
        updatedData.birthday = new Date(data.birthday);
    }
    if (data.gender !== undefined) {
        updatedData.gender = data.gender as GenderType || GenderType.MALE;
    }

    return db.user.update({
        where: { id: +data.id },
        data: updatedData,
    });
}

export default {
    create,
    getAll,
    getById,
    getByEmail,
    remove,
    update,
    updatePassword,
};

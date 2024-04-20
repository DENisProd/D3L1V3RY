import { UserRole, GenderType } from '@prisma/client';
import { Type, type Static } from '@sinclair/typebox'

const ClientSchema = {
    email: Type.String(),
    name: Type.String(),
}

const changePasswordSchema = Type.Object({
    password: Type.String(),
})

const ClientShortSchema = {
    ...ClientSchema,
    password: Type.String(),
}

const banUserSchema = Type.Object({
    value: Type.Boolean(),
})

const GetAllUsersSchema = Type.Object({
    type: Type.Enum(UserRole,{default:UserRole.DEFAULT}),
    search: Type.Optional(Type.String()),
    offset: Type.Optional(Type.Integer()),
    limit: Type.Optional(Type.Integer())
})

const ClientInputSchema = Type.Object({
    ...ClientShortSchema
});

const ClientAdminInputSchema = Type.Object({
    ...ClientShortSchema,
    role: Type.String()
});

const FullClientResponseSchema = {
    ...ClientSchema,
    id: Type.Number(),
    role: Type.String(),
    createdAt: Type.String(),
    birthday: Type.String(),
}

const updateUserSchema = {
    name: Type.Optional(Type.String()),
    id: Type.Number(),
    birthday: Type.Optional(Type.String()),
    gender: Type.Optional(Type.Enum(GenderType)),
}

const UpdateUserInputSchema = Type.Object({
    ...updateUserSchema
});

const updateUserInputSchema = Type.Object({
    ...updateUserSchema,
    email: Type.Optional(Type.String()),
});

const FullAdminClientResponseSchema = {
    ...FullClientResponseSchema,
    token: Type.String(),
}

const ClientResponseSchema = Type.Object({
    ...FullClientResponseSchema
});

const ClientFullResponseSchema = Type.Object({
    ...FullAdminClientResponseSchema
});

const AllUsers = Type.Object({
    items: Type.Array(ClientFullResponseSchema)
});

const updateClientSchema = Type.Object({
    name: Type.Optional(Type.String()),
    gender: Type.Optional(Type.Enum(GenderType))
});

const blockClientSchema = Type.Object({
    value: Type.Boolean(),
});

export type UpdateClientInput = Static<typeof updateClientSchema>;
export type ClientInput = Static<typeof ClientInputSchema>;
export type ClientAdminInput = Static<typeof ClientAdminInputSchema>;
export type ClientResponse = Static<typeof ClientResponseSchema>;
export type ClientAdminResponse = Static<typeof ClientFullResponseSchema>;
export type ClientGetAllUsersSchema = Static<typeof GetAllUsersSchema>;
export type UpdateUserInput = Static<typeof updateUserInputSchema>;

export default {
    ClientResponseSchema,
    ClientFullResponseSchema,
    ClientInputSchema,
    ClientAdminInputSchema,
    AllUsers,
    GetAllUsersSchema,
    updateUserInputSchema,
    banUserSchema,
    changePasswordSchema,
    blockClientSchema,
}
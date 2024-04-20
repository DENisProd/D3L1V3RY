import { Type, type Static } from '@sinclair/typebox'

const loginInput = ({
    email: Type.String({ minLength: 3, maxLength: 32 }),
    password: Type.String({ minLength: 6, maxLength: 32 }),
})
const loginInputSchema = Type.Object({
    ...loginInput
})
const regInputSchema = Type.Object({
    ...loginInput,
    name: Type.String(),
})
const regResponseSchema = Type.Object({
    email: Type.String(),
    name: Type.String(),
    role: Type.String(),
    birthday: Type.Date(),
    createdAt: Type.Date(),
    phone: Type.String(),
    lastActivity: Type.Date(),
})
const loginResponseSchema = Type.Object({
    item: Type.Object({
        token: Type.String(),
    }),
});

const changePasswordSchema = Type.Object({
    password: Type.String({ minLength: 6, maxLength: 32 }),
    oldPassword: Type.String({ minLength: 6, maxLength: 32 }),
})

export type LoginInput = Static<typeof loginInputSchema>;
export type RegInput = Static<typeof regInputSchema>;
export type RegResponse = Static<typeof regResponseSchema>;

export default {
    loginInputSchema,
    loginResponseSchema,
    regInputSchema,
    changePasswordSchema,
}
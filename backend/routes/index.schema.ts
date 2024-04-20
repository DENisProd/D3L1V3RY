import { Type, type Static } from '@sinclair/typebox'

const getAllSchema = {
    page: Type.Optional(Type.Number()),
}

export default {
    getAllSchema,
}
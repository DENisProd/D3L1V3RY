import { Type, type Static } from '@sinclair/typebox'
import indexSchema from '../index.schema'

const getAllAmountSchema = Type.Object({
    ...indexSchema.getAllSchema,
    storeId: Type.Number(),
    sku: Type.Optional(Type.Number())
})

export type GetAllProductAmountInput = Static<typeof getAllAmountSchema>;

export default {
    getAllAmountSchema
}
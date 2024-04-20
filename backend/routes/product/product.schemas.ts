import { Type, type Static } from '@sinclair/typebox'
import indexSchema from '../index.schema';

const product = {
    product_name: Type.String(),
    product_cost: Type.Number(),
    manufacture_date: Type.String(),
    expiry_date: Type.String(),
    sku: Type.String(),
    storeId: Type.Number(),
    manufacturerId: Type.Number()
}

const createProductSchema = Type.Object({
    ...product
})

const getAllProductsSchema = Type.Object({
    ...indexSchema.getAllSchema,
    status: Type.Optional(Type.String()),
    storeId: Type.Optional(Type.Number()),
    soonExpires: Type.Optional(Type.Boolean()),
});

export type CreateProductInput = Static<typeof createProductSchema>;
export type GetAllProductsInput = Static<typeof getAllProductsSchema>;

export default {
    createProductSchema,
    getAllProductsSchema,
}
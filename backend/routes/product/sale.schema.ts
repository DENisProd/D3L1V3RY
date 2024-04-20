import { Type, type Static } from '@sinclair/typebox'
import indexSchema from '../index.schema'

const sale = {
  sale_date: Type.String(),
  quantity_sold: Type.Number(),
  product_amount: Type.Number(),
  product_measure: Type.String(),
  product_volume: Type.Number(),
  productId: Type.Number(),
}

const createSaleSchema = Type.Object({
    ...sale,
})

const getSalesSchema = Type.Object({
    ...indexSchema.getAllSchema,
})

export type CreateSaleInput = Static<typeof createSaleSchema>;
export type GetAllSalesUnput = Static<typeof getSalesSchema>;

export default {
    createSaleSchema,
    getSalesSchema,
}
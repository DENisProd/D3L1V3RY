import { Type, type Static } from '@sinclair/typebox'
import indexSchema from '../index.schema'

const manufacturer = {
    manufacturer_name: Type.String(),
    manufacturer_address: Type.String()
}

const createManufacturerSchema = Type.Object({
    ...manufacturer,
})

const getManufacturerSchema = Type.Object({
    ...indexSchema.getAllSchema,
    search: Type.Optional(Type.String()),
})

export type CreateManufacturerInput = Static<typeof createManufacturerSchema>;
export type GetAllManufacturerInput = Static<typeof getManufacturerSchema>;

export default {
    createManufacturerSchema,
    getManufacturerSchema,
}
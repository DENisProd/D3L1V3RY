import { Type, type Static } from '@sinclair/typebox'
import indexSchema from '../index.schema';
import { StoreType } from '@prisma/client';

const createStorageSchema = Type.Object({
  store_name: Type.String(),
  store_address: Type.String(),
  region: Type.String(),
  type: Type.Enum(StoreType, { default: StoreType.STORE }),
})

const getAllStorageSchemas = Type.Object({
    ...indexSchema.getAllSchema,
    region: Type.Optional(Type.String()),
    search: Type.Optional(Type.String()),
    type: Type.Enum(StoreType, { default: StoreType.STORE }),
});

export type GetAllStorageInput = Static<typeof getAllStorageSchemas>;
export type CreateStorageInput = Static<typeof createStorageSchema>;

export {
    getAllStorageSchemas,
    createStorageSchema,
}
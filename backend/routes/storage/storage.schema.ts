import { Type, type Static } from '@sinclair/typebox'
import indexSchema from '../index.schema';
import { StoreType } from '@prisma/client';

const coordinatesSchema = Type.Object({
  lat: Type.Number(),
  lon: Type.Number(),
});

const createStorage = {
  store_name: Type.String(),
  store_address: Type.String(),
  region: Type.String(),
  coordinates: Type.Optional(coordinatesSchema),
  type: Type.Optional(Type.Enum(StoreType)),
}

const createStorageSchema = Type.Object({
  ...createStorage,
})

const updateStorageSchema = Type.Object({
  ...createStorage,
  id: Type.Number(),
})

const getAllStorageSchemas = Type.Object({
    ...indexSchema.getAllSchema,
    region: Type.Optional(Type.String()),
    search: Type.Optional(Type.String()),
    type: Type.Optional(Type.Enum(StoreType)),
});

export type GetAllStorageInput = Static<typeof getAllStorageSchemas>;
export type CreateStorageInput = Static<typeof createStorageSchema>;
export type UpdateStorageInput = Static<typeof updateStorageSchema>;

export {
    getAllStorageSchemas,
    createStorageSchema,
    updateStorageSchema,
}
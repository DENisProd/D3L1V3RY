import { Store, StoreType } from "@prisma/client";
import { db } from "../../plugins/db";
import { CreateStorageInput, GetAllStorageInput } from "../../routes/storage/storage.schema";
import { PAGINATION_COUNT } from "../../config";

async function create (input: CreateStorageInput): Promise<Store> {
    const storage = await db.store.create({
        data: {
            store_name: input.store_name || "",
            store_address: input.store_address || "",
            region: input.region || "",
            store_type: input.type as StoreType || StoreType.STORE,
        }
    })
    return storage;
}

async function getAll (input: GetAllStorageInput): Promise<Store[]> {
    let conditions: any = { };
    
    if (input?.region) conditions = { region: { contains: input?.region, mode: "insensitive" } };
    if (input?.search) conditions = { store_name: { contains: input?.search, mode: "insensitive" } };

    const storages = await db.store.findMany({
        where: conditions,
        orderBy: { id: "asc" },
        skip: +(input?.page ? (input?.page - 1) * PAGINATION_COUNT : 0 || 0),
        take: PAGINATION_COUNT
    })
    return storages;
}

export default {
    create,
    getAll,
}
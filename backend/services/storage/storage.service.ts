import { Store, StoreType } from "@prisma/client";
import { db } from "../../plugins/db";
import { CreateStorageInput, GetAllStorageInput, UpdateStorageInput } from "../../routes/storage/storage.schema";
import { PAGINATION_COUNT } from "../../config";

async function create (input: CreateStorageInput): Promise<Store> {
    const storage = await db.store.create({
        data: {
            store_name: input.store_name || "",
            store_address: input.store_address || "",
            region: input.region || "",
            store_type: input.type as StoreType || StoreType.STORE,
            coordinates: {
                create: {
                    lon: input.coordinates.lon || 0,
                    lat: input.coordinates.lat || 0,
                }
            }
        }
    })
    return storage;
}

async function update(input: UpdateStorageInput): Promise<Store> {
    let storage: Store = null;
    storage = await getById(input.id);
    if (!storage) return null;

    storage = await db.store.update({
        where: { id: +input.id },
        data: {
            store_name: input.store_name || "",
            store_address: input.store_address || "",
            region: input.region || "",
            store_type: input.type as StoreType || StoreType.STORE
        }
    });
    if (!storage) return null;

    if (input?.coordinates?.lon !== undefined && input?.coordinates?.lat !== undefined) {
        const existingCoordinates = await db.coordinate.findUnique({
            where: { storeId: +input.id }
        });

        if (existingCoordinates) {
            await db.coordinate.update({
                where: { id: existingCoordinates.id },
                data: {
                    lon: input?.coordinates?.lon,
                    lat: input?.coordinates?.lat
                }
            });
        } else {
            await db.coordinate.create({
                data: {
                    lon: input?.coordinates?.lon,
                    lat: input?.coordinates?.lat,
                    storeId: +input.id
                }
            });
        }
    }

    return storage;
}


async function getAll (input: GetAllStorageInput): Promise<Store[]> {
    let conditions: any = { };

    if (input?.region) conditions = { ...conditions, region: { contains: input?.region, mode: "insensitive" } };
    // if (input?.region) conditions = { region: input?.region };
    if (input?.search) conditions = { ...conditions, store_name: { contains: input?.search, mode: "insensitive" } };
    if (input?.type) conditions = { ...conditions, store_type: input?.type }

    const storages = await db.store.findMany({
        where: {
            ...conditions,
        },
        orderBy: { region: "desc" },
        skip: +(input?.page ? (input?.page - 1) * PAGINATION_COUNT : 0 || 0),
        take: PAGINATION_COUNT,
        include: {
            coordinates: true
        }
    })
    return storages;
}

async function getById (id: number): Promise<Store> {
    return await db.store.findUnique({
        where: { id: +id },
        include: {
            coordinates: true
        }
    })
}

export default {
    create,
    getAll,
    update,
    getById,
}
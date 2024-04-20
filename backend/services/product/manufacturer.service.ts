import { PAGINATION_COUNT } from "../../config";
import { db } from "../../plugins/db";
import { CreateManufacturerInput, GetAllManufacturerInput } from "../../routes/product/manufacturer.schema";

async function create (input: CreateManufacturerInput) {
    const manufacturer = await db.manufacturer.create({
        data: {
            manufacturer_name: input.manufacturer_name || "",
            manufacturer_address: input.manufacturer_address || "ул. Обычная",
        }
    })
    return manufacturer;
}

async function update (input: CreateManufacturerInput, id: number) {
    const manufacturer = await db.manufacturer.update({
        where: {
            id: +id,
        },
        data: {
            manufacturer_name: input.manufacturer_name || "",
            manufacturer_address: input.manufacturer_address || "ул. Обычная",
        }
    })
    return manufacturer;
}

async function getAll (input: GetAllManufacturerInput) {
    let conditions: any = { };

    if (input?.search) {
        conditions = {
            ...conditions,
            manufacturer_name: { contains: input?.search, mode: "insensitive" }
        }
    }
    const manufacturers = await db.manufacturer.findMany({
        where: {
            ...conditions,
        },
        orderBy: { id: "asc" },
        skip: +(input?.page ? (input?.page - 1) * PAGINATION_COUNT : 0 || 0),
        take: PAGINATION_COUNT
    })
    return manufacturers;
}

export default {
    create,
    getAll,
    update,
}
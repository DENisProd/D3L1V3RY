import { PAGINATION_COUNT } from "../../config";
import { db } from "../../plugins/db";
import { GetAllProductAmountInput } from "../../routes/product_amount/product_amount.schemas";

async function getAll(input: GetAllProductAmountInput) {
    let conditions: any = { };

    if (input?.sku) conditions = {...conditions, product: {sku: input?.sku} };

    const productAmounts = await db.productAmount.findMany({
        where: {
            storeId: input?.storeId,
            ...conditions,
        },
        orderBy: { id: "asc" },
        skip: +(input?.page ? (input?.page - 1) * PAGINATION_COUNT : 0 || 0),
        take: PAGINATION_COUNT,
        include: {
            product: true,
            store: {
                select: {
                    store_name: true,
                }
            }
        },
    })

    return productAmounts;
}

async function getCount(input: GetAllProductAmountInput) {
    let conditions: any = { };

    if (input?.sku) conditions = {...conditions, product: {sku: input?.sku} };

    const productAmounts = await db.productAmount.count({
        where: {
            storeId: input?.storeId,
            ...conditions,
        },
    })

    return productAmounts;
}

export default {
    getAll,
    getCount,
}
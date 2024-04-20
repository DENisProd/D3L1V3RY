import { PAGINATION_COUNT } from "../../config";
import { db } from "../../plugins/db";
import { CreateSaleInput, GetAllSalesInput } from "../../routes/product/sale.schema";

export enum EGetAllSales {
    LAST_DAY = "LAST_DAY",
    LAST_WEEK = "LAST_WEEK",
    LAST_MONTH = "LAST_MONTH",
}

async function create (input: CreateSaleInput) {
    const sale = await db.sale.create({
        data: {
            sale_date: new Date(),
            quantity_sold: input?.quantity_sold,            
            product_amount: input?.product_amount || 1.0,
            product_measure: input?.product_measure || 'шт.',
            product_volume: input?.product_volume,
            productId: input?.productId,
        }
    });
    return sale;
}

async function getAll (input: GetAllSalesInput) {
    let conditions: any = { };

    const sales = await db.sale.findMany({
        where: {
            ...conditions,
        },
        orderBy: { id: "asc" },
        skip: +(input?.page ? (input?.page - 1) * PAGINATION_COUNT : 0 || 0),
        take: PAGINATION_COUNT
    })
    return sales;
}

export default {
    create,
    getAll,
}
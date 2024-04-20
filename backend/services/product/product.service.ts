import { ProductDeliveryStatus } from "@prisma/client";
import { GetAllProductsInput } from "../../routes/product/product.schemas";
import { PAGINATION_COUNT } from "../../config";
import { db } from "../../plugins/db";

const DAYS_TO_EXPIRES = 3;

async function getAll (input: GetAllProductsInput) {
    try {
        let conditions: any = { };
        if (input?.status) {
            let _status = input.status as ProductDeliveryStatus;
            console.log(_status)
            if (_status === ProductDeliveryStatus.COMPLETE || _status === ProductDeliveryStatus.IN_PROGRESS) {
                conditions = {
                    ...conditions,
                    product_delivery: {
                        status: _status
                    }
                }
            }
        }

        if (input?.storeId) {
            conditions = {
            ...conditions,
                product_amount: {
                    storeId: +input?.storeId
                }
            }
        }

        if (input?.soonExpires) {
            const countDays = new Date();
            countDays.setDate(countDays.getDate() + DAYS_TO_EXPIRES);

            conditions = {
                ...conditions,
                AND: [
                    { expiry_date: { lt: countDays }},
                    { expiry_date: { gt: new Date() }},
                ]
            }
        }

        const products =await db.product.findMany({
            where: {
                ...conditions,
            },
            orderBy: { expiry_date: "desc" },
            skip: +(input?.page ? (input?.page - 1) * PAGINATION_COUNT : 0 || 0),
            take: PAGINATION_COUNT,
            include: {
                product_amount: true
            }
        })
        const amounts = await Promise.all(products.map(async (product_amount,...product) => ({ ...product, ...product_amount})))
        if (!amounts) return [];
        return amounts;
    } catch (e) {
        console.log(e);
        return [];
    }
}

async function getCount (input: GetAllProductsInput) {
    try {
        let conditions: any = { };
        if (input?.status) {
            let _status = input.status as ProductDeliveryStatus;
            console.log(_status)
            if (_status === ProductDeliveryStatus.COMPLETE || _status === ProductDeliveryStatus.IN_PROGRESS) {
                conditions = {
                    ...conditions,
                    product_delivery: {
                        status: _status
                    }
                }
            }
        }

        if (input?.storeId) {
            conditions = {
            ...conditions,
                storeId: +input?.storeId
            }
        }

        if (input?.soonExpires) {
            const countDays = new Date();
            countDays.setDate(countDays.getDate() + DAYS_TO_EXPIRES);

            conditions = {
                ...conditions,
                AND: [
                    { expiry_date: { lt: countDays }},
                    { expiry_date: { gt: new Date() }},
                ]
            }
        }

        const products = await db.product.count({
            where: {
                ...conditions,
            },
        })
        return products;
    } catch (e) {
        console.log(e);
        return 0;
    }
}

export default {
    getAll,
    getCount,
}
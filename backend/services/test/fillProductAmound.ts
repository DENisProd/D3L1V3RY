import { db } from "../../plugins/db";
import storageService from "../storage/storage.service";
import pLimit from "@esm2cjs/p-limit";

export async function fillProductAmount () {
    const products = await db.product.findMany({ where: {} });
    const limit = pLimit(100);
    products.map( async product => {
        await limit(async () => {
            const storages = await storageService.getAll({});
            await Promise.all(storages.map(async store => {
                const amount = Math.floor(Math.random() * 100);

                const amountFromDb = await db.productAmount.findFirst({ 
                    where: {
                        productId: product.id,
                        storeId: store.id,
                    }
                })
                if (amountFromDb) {
                    await db.productAmount.update({
                        where: {
                            id: amountFromDb.id,
                        },
                        data: {
                            amount: amountFromDb.amount + amount,
                        }
                    })
                    return;
                }
                
                const newAmount = await db.productAmount.create({
                    data: {
                        amount: amount + 1,
                        storeId: store.id,
                        productId: product.id,
                    }
                })
            }));
        });
    })
}



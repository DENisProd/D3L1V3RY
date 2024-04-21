import { FastifyReply, FastifyRequest } from "fastify";
import { GetAllProductAmountInput } from "../../routes/product_amount/product_amount.schemas";
import product_amountService from "../../services/product_amount/product_amount.service";
import { ProductAmount } from "@prisma/client";

function toShortSchema(data: any) {
    const { store, product, ...rest } = data;
    return {
        id: data?.id,
        productId: data?.productId,
        storeId: data?.storeId,
        amount: data?.product?.amount,
        product_name: data?.product?.product_name,
        product_cost: data?.product?.product_cost,
        manufacture_date: data?.product?.manufacture_date,
        expiry_date: data?.product?.expiry_date,
        sku: data?.product?.sku,
        store_name: data?.store?.store_name,
    }
}

async function getAll (req: FastifyRequest<{ Querystring: GetAllProductAmountInput }>, reply: FastifyReply) {
    try {
        const user = (req as any).user;

        const productAmounts = await product_amountService.getAll(req.query);
        if (!productAmounts) {
            return reply.status(400).send({ success: false, message: "Некорректный запрос" });
        }
        let response = []
        response = productAmounts.map(productAmount => {
            return toShortSchema(productAmount);
        });
        const count = await product_amountService.getCount(req.query);
        return reply.send({ success: true, items: response, count });
    } catch (err) {
        console.log(err);
        return reply.status(500).send({ success: false, message: "Ошибка при получении"});
    }
}

export default {
    getAll,
}
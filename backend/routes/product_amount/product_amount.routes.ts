import product_amountController from "../../controllers/product_amount/product_amount.controller";
import { isAuthenticated } from "../../plugins/authenticate.middleware";
import product_amountSchemas from "./product_amount.schemas";

export default async function productAmountRoutes(fastify: any) {
    fastify.get("/all", {
        schema: {
            tags: ["Количество товаров на складе"],
            querystring: product_amountSchemas.getAllAmountSchema
        },
        preHandler: isAuthenticated,
        handler: product_amountController.getAll,
    });
}

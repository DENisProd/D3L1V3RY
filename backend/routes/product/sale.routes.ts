import salesController from "../../controllers/product/sales.controller";
import { isAuthenticated } from "../../plugins/authenticate.middleware";
import saleSchema from "./sale.schema";

export default async function salesRoutes(fastify: any) {
    fastify.post("/", {
        schema: {
            tags: ["Продажи"],
            body: saleSchema.createSaleSchema
        },
        preHandler: isAuthenticated,
        handler: salesController.create,
    });

    fastify.get("/all", {
        schema: {
            tags: ["Продажи"],
            querystring: saleSchema.getSalesSchema
        },
        preHandler: isAuthenticated,
        handler: salesController.getAll,
    });
}

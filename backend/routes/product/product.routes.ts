import productController from "../../controllers/product/product.controller";
import { isAuthenticated } from "../../plugins/authenticate.middleware";
import productSchemas from "./product.schemas";

export default async function productRoutes(fastify: any) {
    // fastify.post("/", {
    //     schema: {
    //         tags: ["Продукты"],
    //         body: productSchemas.createProductSchema
    //     },
    //     preHandler: isAuthenticated,
    //     handler: productController.create,
    // });

    fastify.get("/all", {
        schema: {
            tags: ["Продукты"],
            querystring: productSchemas.getAllProductsSchema
        },
        preHandler: isAuthenticated,
        handler: productController.getAll,
    });
}
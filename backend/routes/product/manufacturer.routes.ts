import manufacturerController from "../../controllers/product/manufacturer.controller";
import { isAuthenticated } from "../../plugins/authenticate.middleware";
import manufacturerSchema from "./manufacturer.schema";

export default async function manufacturerRoutes(fastify: any) {
    fastify.post("/", {
        schema: {
            tags: ["Производитель"],
            body: manufacturerSchema.createManufacturerSchema
        },
        preHandler: isAuthenticated,
        handler: manufacturerController.create,
    });

    fastify.put("/:id", {
        schema: {
            tags: ["Производитель"],
            body: manufacturerSchema.createManufacturerSchema
        },
        preHandler: isAuthenticated,
        handler: manufacturerController.update,
    });

    fastify.get("/all", {
        schema: {
            tags: ["Производитель"],
            querystring: manufacturerSchema.getManufacturerSchema
        },
        preHandler: isAuthenticated,
        handler: manufacturerController.getAll,
    });
}

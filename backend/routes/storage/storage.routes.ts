import storageController from "../../controllers/storage/storage.controller";
import { isAuthenticated } from "../../plugins/authenticate.middleware";
import { createStorageSchema, getAllStorageSchemas, updateStorageSchema } from "./storage.schema";

export default async function storageRoutes(fastify: any) {
    fastify.post("/", {
        schema: {
            tags: ["Склады и точки продажи"],
            body: createStorageSchema
        },
        preHandler: isAuthenticated,
        handler: storageController.create,
    });
    fastify.put("/", {
        schema: {
            tags: ["Склады и точки продажи"],
            body: updateStorageSchema
        },
        preHandler: isAuthenticated,
        handler: storageController.update,
    });

    fastify.get("/all", {
        schema: {
            tags: ["Склады и точки продажи"],
            querystring: getAllStorageSchemas
        },
        preHandler: isAuthenticated,
        handler: storageController.getAll,
    });

    fastify.get("/:id", {
        schema: {
            tags: ["Склады и точки продажи"],
        },
        preHandler: isAuthenticated,
        handler: storageController.getById,
    });
}

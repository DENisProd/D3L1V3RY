import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import userRoutes from "./user/user.routes";
import authUserRoutes from "./user/auth/auth.routes";
import storageRoutes from "./storage/storage.routes";
import salesRoutes from "./product/sale.routes";
import manufacturerRoutes from "./product/manufacturer.routes";
import productRoutes from "./product/product.routes";


export default function setupRoutes(fastify: FastifyInstance) {
   
    fastify.get('/api', async (request: FastifyRequest, reply: FastifyReply) => {
        reply.send(request.headers);
    });

    fastify.register(authUserRoutes, { logLevel: "debug", prefix: "/api/auth" })
    fastify.register(userRoutes, { logLevel: "debug", prefix: "/api/user" })
    fastify.register(storageRoutes, { logLevel: "debug", prefix: "/api/storage" })
    fastify.register(salesRoutes, { logLevel: "debug", prefix: "/api/sale" })
    fastify.register(manufacturerRoutes, { logLevel: "debug", prefix: "/api/manufacturer" })
    fastify.register(productRoutes, { logLevel: "debug", prefix: "/api/product" })
}
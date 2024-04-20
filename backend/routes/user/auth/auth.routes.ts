import authSchema from "./auth.schema";
import { isAuthenticated } from "../../../plugins/authenticate.middleware";
import userController from "../../../controllers/user/user.controller";

export default async function authClientRoutes(fastify: any) {

  fastify.post("/login", {
    schema: {
        tags: ["Авторизация"],
      body: authSchema.loginInputSchema,
    }
  }, userController.login);

  fastify.post("/check", {
    schema: {
      tags: ["Авторизация"],
    },
    preHandler: isAuthenticated,
    handler: userController.check
  });

  fastify.post("/reg", {
    schema: {
      tags: ["Авторизация"],
      body: authSchema.regInputSchema,
    }
  }, userController.register);
}


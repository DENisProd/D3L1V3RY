import { isAuthenticated } from "../../plugins/authenticate.middleware";
import clientController from "../../controllers/user/user.controller";

export default async function clientRoutes(fastify: any) {
  fastify.get("/profile", {
    schema: {
      tags: ["Пользователь"],
    },
    preHandler: isAuthenticated,
    handler: clientController.getMyProfile
  });
}


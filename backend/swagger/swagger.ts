import swagger from "@fastify/swagger"
import swaggerUI from "@fastify/swagger-ui"

export default async function initSwagger(fastify: any) {
   
    fastify.register(swagger, {
        swagger: {
            openapi: '3.0.0',
            info: {
                title: "Darksecrets",
                description: "",
                version: "0.9.0",
            },
            externalDocs: {
                url: "https://swagger.io",
                description: "Find more info here",
            },
            // servers: [
            //     { 
            //         basePath: {
            //             default: "api"
            //           }
            //     } // базовый URL для вашего API
            // ],
            tags: [

            ],
            schemes: ["http","https"],
            consumes: ["application/json"],
            produces: ["application/json"],
            security: [
                {
                    Bearer: [],
                },
            ],
            securityDefinitions: {
                Bearer: {
                    type: "apiKey",
                    name: "Authorization",
                    in: "header",
                },
            },
        },
        exposeRoute: true,
    });

    fastify.register(swaggerUI, {
        routePrefix: "/api/docs",
        uiConfig: {
            docExpansion: "list",
            deepLinking: false,
        },
        servers: [
            { 
                basePath: {
                    default: "api"
                  }
            } // базовый URL для вашего API
        ],
        staticCSP: true,
        transformSpecificationClone: true,
    });
}

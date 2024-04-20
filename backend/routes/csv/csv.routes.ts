import csvController from "../../controllers/csv/csv.controller";

export default async function csvRoutes(fastify: any) {
    fastify.get("/parse_hakaton", {
        schema: {
            tags: ["CSV"],
        },
        handler: csvController.parse
    });
    fastify.get("/fill_amounts", {
        schema: {
            tags: ["CSV"],
        },
        handler: csvController.fillAmounts
    });
}

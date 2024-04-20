import { FastifyReply, FastifyRequest } from "fastify";
import { GetAllProductsInput } from "../../routes/product/product.schemas";
import productService from "../../services/product/product.service";

async function getAll (req: FastifyRequest<{ Querystring: GetAllProductsInput }>, reply: FastifyReply) {
    try {
        const user = (req as any).user;
        // TODO: check role
        const products = await productService.getAll(req.query);
        if (!products) {
            return reply.status(400).send({ success: false, message: "Некорректный запрос" });
        }
        const productsCount = await productService.getCount(req.query);
        return reply.send({ success: true, items: products, count: productsCount });
    } catch (err) {
        console.log(err);
        return reply.status(500).send({ success: false, message: "Ошибка при получении"});
    }
}

export default {
    getAll,
}
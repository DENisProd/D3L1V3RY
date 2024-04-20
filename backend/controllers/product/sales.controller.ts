import { FastifyReply, FastifyRequest } from "fastify";
import { CreateSaleInput, GetAllSalesInput } from "../../routes/product/sale.schema";
import saleService from "../../services/product/sale.service";

async function create (req: FastifyRequest<{ Body: CreateSaleInput }>, reply: FastifyReply) {
    try {
        const user = (req as any).user;
        // TODO: check role
        const sale = await saleService.create(req.body);
        if (!sale) {
            return reply.status(500).send({ success: false, message: "Ошибка при создании" });
        }
        return reply.send({ success: !!sale });
    } catch (err) {
        console.log(err);
        return reply.status(500).send({ success: false, message: "Ошибка при получении профиля"});
    }
}

async function getAll (req: FastifyRequest<{ Querystring: GetAllSalesInput }>, reply: FastifyReply) {
    try {
        const user = (req as any).user;
        // TODO: check role
        const sales = await saleService.getAll(req.body);
        if (!sales) {
            return reply.status(500).send({ success: false, message: "Ошибка при получении" });
        }
        return reply.send({ success: true, items: sales });
    } catch (err) {
        console.log(err);
        return reply.status(500).send({ success: false, message: "Ошибка при получении"});
    }
}

export default {
    create,
    getAll,
}
import { FastifyReply, FastifyRequest } from "fastify";
import { CreateManufacturerInput, GetAllManufacturerInput } from "../../routes/product/manufacturer.schema";
import manufacturerService from "../../services/product/manufacturer.service";

async function create (req: FastifyRequest<{ Body: CreateManufacturerInput }>, reply: FastifyReply) {
    try {
        const user = (req as any).user;
        // TODO: check role
        const manufacturer = await manufacturerService.create(req.body);
        if (!manufacturer) {
            return reply.status(400).send({ success: false, message: "Ошибка при создании" });
        }
        return reply.send({ success: !!manufacturer });
    } catch (err) {
        console.log(err);
        return reply.status(500).send({ success: false, message: "Ошибка при создании"});
    }
}

async function update (req: FastifyRequest<{ Body: CreateManufacturerInput, Params: { id: number } }>, reply: FastifyReply) {
    try {
        const user = (req as any).user;
        if (!req.params.id) {
            return reply.status(400).send({ success: false, message: "Неверный запрос" });
        }
        // TODO: check role
        const manufacturer = await manufacturerService.update(req.body, req.params.id);
        if (!manufacturer) {
            return reply.status(400).send({ success: false, message: "Ошибка при создании" });
        }
        return reply.send({ success: !!manufacturer });
    } catch (err) {
        console.log(err);
        return reply.status(500).send({ success: false, message: "Ошибка при создании"});
    }
}

async function getAll (req: FastifyRequest<{ Querystring: GetAllManufacturerInput }>, reply: FastifyReply) {
    try {
        const user = (req as any).user;
        // TODO: check role
        const manufacturers = await manufacturerService.getAll(req.query);
        if (!manufacturers) {
            return reply.status(400).send({ success: false, message: "Ошибка при получении" });
        }
        return reply.send({ success: true, items: manufacturers });
    } catch (err) {
        console.log(err);
        return reply.status(500).send({ success: false, message: "Ошибка при получении"});
    }
}

export default {
    create,
    getAll,
    update,
}
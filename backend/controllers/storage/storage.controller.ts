import { FastifyReply, FastifyRequest } from "fastify";
import { CreateStorageInput, GetAllStorageInput, UpdateStorageInput } from "../../routes/storage/storage.schema";
import storageService from "../../services/storage/storage.service";

async function create (req: FastifyRequest<{ Body: CreateStorageInput }>, reply: FastifyReply) {
    try {
        const user = (req as any).user;
        // TODO: check role
        const storage = await storageService.create(req.body);
        if (!storage) {
            return reply.status(400).send({ success: false, message: "Ошибка при создании" });
        }
        return reply.send({ success: !!storage });
    } catch (err) {
        console.log(err);
        return reply.status(500).send({ success: false, message: "Ошибка при получении профиля"});
    }
}

async function update (req: FastifyRequest<{ Body: UpdateStorageInput }>, reply: FastifyReply) {
    try {
        const user = (req as any).user;
        // TODO: check role
        const storage = await storageService.update(req.body);
        if (!storage) {
            return reply.status(400).send({ success: false, message: "Ошибка при обновлении" });
        }
        return reply.send({ success: !!storage });
    } catch (err) {
        console.log(err);
        return reply.status(500).send({ success: false, message: "Ошибка при обновлении склада"});
    }
}

async function getAll (req: FastifyRequest<{ Querystring: GetAllStorageInput }>, reply: FastifyReply) {
    try {
        const user = (req as any).user;
        // TODO: check role
        const storages = await storageService.getAll(req.query);
        if (!storages) {
            return reply.status(400).send({ success: false, message: "Ошибка при создании" });
        }
        return reply.send({ success: true, items: storages });
    } catch (err) {
        console.log(err);
        return reply.status(500).send({ success: false, message: "Ошибка при получении"});
    }
}

async function getById (req: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply) {
    try {
        const user = (req as any).user;
        // TODO: check role
        const storage = await storageService.getById(req.params.id);
        if (!storage) {
            return reply.status(400).send({ success: false, message: "Ошибка при получении" });
        }
        return reply.send({ success: true, item: storage });
    } catch (err) {
        console.log(err);
        return reply.status(500).send({ success: false, message: "Ошибка при получении"});
    }
}

export default {
    create,
    getAll,
    update,
    getById,
}
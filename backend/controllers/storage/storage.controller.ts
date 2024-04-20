import { FastifyReply, FastifyRequest } from "fastify";
import { CreateStorageInput, GetAllStorageInput } from "../../routes/storage/storage.schema";
import storageService from "../../services/storage/storage.service";

async function create (req: FastifyRequest<{ Body: CreateStorageInput }>, reply: FastifyReply) {
    try {
        const user = (req as any).user;
        // TODO: check role
        const storage = await storageService.create(req.body);
        if (!storage) {
            return reply.status(500).send({ success: false, message: "Ошибка при создании" });
        }
        return reply.send({ success: !!storage });
    } catch (err) {
        console.log(err);
        return reply.status(500).send({ success: false, message: "Ошибка при получении профиля"});
    }
}

async function getAll (req: FastifyRequest<{ Querystring: GetAllStorageInput }>, reply: FastifyReply) {
    try {
        const user = (req as any).user;
        // TODO: check role
        const storages = await storageService.getAll(req.query);
        if (!storages) {
            return reply.status(500).send({ success: false, message: "Ошибка при создании" });
        }
        return reply.send({ success: true, items: storages });
    } catch (err) {
        console.log(err);
        return reply.status(500).send({ success: false, message: "Ошибка при получении профиля"});
    }
}


export default {
    create,
    getAll,
}
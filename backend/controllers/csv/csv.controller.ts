import { FastifyReply, FastifyRequest } from "fastify";
import csvService from "../../services/csv.service";
import { fillProductAmount } from "../../services/test/fillProductAmound";

async function parse (req: FastifyRequest, reply: FastifyReply) {
    try {
        await csvService.parse('');
        return reply.status(200).send({success: true});
    } catch (err) {
        console.error(err);
        return reply.status(500).send({success: false, message: 'Ошибка'});
    }
}

async function fillAmounts (req: FastifyRequest, reply: FastifyReply) {
    try {
        await fillProductAmount();
        return reply.status(200).send({success: true});
    } catch (err) {
        console.error(err);
        return reply.status(500).send({success: false, message: 'Ошибка'});
    }
}

export default {
    parse,
    fillAmounts,
}
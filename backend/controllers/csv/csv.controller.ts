import { FastifyReply, FastifyRequest } from "fastify";
import csvService from "../../services/csv.service";
import { fillProductAmount } from "../../services/test/fillProductAmound";
import parseRouteService, { MetricWeights, StoreLink } from "../../services/route/parseRoute.service";
import { db } from "../../plugins/db";

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
    // try {
    //     await fillProductAmount();
    //     return reply.status(200).send({success: true});
    // } catch (err) {
    //     console.error(err);
    //     return reply.status(500).send({success: false, message: 'Ошибка'});
    // }

    // const array = parseRouteService.readMatrix(false);
    // console.log(array);
    // const data = await parseRouteService.writeArray(array);
    // console.log(data);

    await testSearchRoute();
}

async function testSearchRoute() {
    const data = await db.timeMatrix.findMany({ where: {}})
    const data2 = await db.distanceMatrix.findMany({ where: {}})


    try {

    // Функция, которая проверяет, есть ли совпадение storeId1 и storeId2 в двух объектах
    const isCommon = (item1, item2) => {
        return item1.storeId1 === item2.storeId1 && item1.storeId2 === item2.storeId2;
    };

    // Находим пересечение объектов по storeId1 и storeId2 и объединяем данные
    const intersection = data.map(item1 => {
        const commonItem = data2.find(item2 => isCommon(item1, item2));
        if (commonItem) {
            return {
                ...item1,
                distance: commonItem.distance
            };
        }
    });

    console.log(intersection);

    // Использование функций
    const graph = parseRouteService.createGraph(intersection);
    const startStore = 10; // начальный магазин
    const endStore = 47;  // конечный магазин
    const weights: MetricWeights = { time: 1, distance: 0.4 }; // Коэффициенты можно настроить
    const [pathSegments, cost] = parseRouteService.dijkstra(graph, startStore, endStore, weights);
    console.log(`Путь: ${pathSegments.join(' -> ')}`);
    console.log(`Общая оценка пути: ${cost}`);
} catch (err) {
    console.log(err);
}
}

export default {
    parse,
    fillAmounts,
}
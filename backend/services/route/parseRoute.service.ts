import { TimeMatrix } from "@prisma/client"
import { db } from "../../plugins/db"

const data = [['', 'Склад 1',	'Склад 2',	'Склад 3',	'Клиент 1',	'Клиент 2',	'Клиент 3',	'Клиент 4',	'Клиент 5',	'Клиент 6',	'Клиент 7',	'Клиент 8',	'Клиент 9',	'Клиент 10'],
['Склад 1',	0,	2161,	1831,	1329,	1399,	1683,	1089,	1751,	1467,	1780,	1930,	2299,	2425],
['Склад 2',	1949,	0,	1992,	874,	1129,	894,	1269,	1268,	1527,	1217,	1017,	864,	771],
['Склад 3',	2040,	2168,	0,	1812,	1342,	1748,	2071,	2334,	1374,	1011,	2451,	1483,	1785],
['Клиент 1',	1330,	1114,	1650,	0,	525,	630,	628,	863,	871,	768,	904,	1133,	1080],
['Клиент 2',	1116,	1214,	1225,	535,	0,	573,	836,	1068,	464,	390,	1348,	1140,	1199],
['Клиент 3',	1505,	999,	1623,	762,	719,	0,	1225,	1318,	1140,	916,	1397,	658,	716],
['Клиент 4',	981,	1603,	1764,	688,	914,	1206,	0,	665,	1300,	1289,	892,	1726,	1579],
['Клиент 5',	1673,	1225,	2315,	1076,	1378,	1413,	699,	0,	1760,	1540,	636,	1748,	1612],
['Клиент 6',	1301,	1592,	1045,	856,	464,	933,	1128,	1474,	0,	389,	1572,	1402,	1463],
['Клиент 7',	1506,	1457,	937,	767,	370,	820,	1152,	1448,	449,	0,	1505,	1060,	1150],
['Клиент 8',	1852,	1130,	2295,	1009,	1348,	1372,	893,	528,	1690,	1524,	0,	1661,	1565],
['Клиент 9',	1899,	859,	1516,	1125,	1061,	766,	1555,	1681,	1427,	1055,	1502,	0,	336],
['Клиент 10', 1960, 735, 1595, 1009, 1138, 838, 1409, 1557, 1504, 1134, 1399, 194, 0]]

const my_data = [
    ['', 10,	82,	47,	26,	48,	40,	20,	9,	86,	71,	63,	22,	56],
[10,	0,	2161,	1831,	1329,	1399,	1683,	1089,	1751,	1467,	1780,	1930,	2299,	2425],
[82,	1949,	0,	1992,	874,	1129,	894,	1269,	1268,	1527,	1217,	1017,	864,	771],
[47,	2040,	2168,	0,	1812,	1342,	1748,	2071,	2334,	1374,	1011,	2451,	1483,	1785],
[26,	1330,	1114,	1650,	0,	525,	630,	628,	863,	871,	768,	904,	1133,	1080],
[48,	1116,	1214,	1225,	535,	0,	573,	836,	1068,	464,	390,	1348,	1140,	1199],
[40,	1505,	999,	1623,	762,	719,	0,	1225,	1318,	1140,	916,	1397,	658,	716],
[20,	981,	1603,	1764,	688,	914,	1206,	0,	665,	1300,	1289,	892,	1726,	1579],
[9,	1673,	1225,	2315,	1076,	1378,	1413,	699,	0,	1760,	1540,	636,	1748,	1612],
[86,	1301,	1592,	1045,	856,	464,	933,	1128,	1474,	0,	389,	1572,	1402,	1463],
[71,	1506,	1457,	937,	767,	370,	820,	1152,	1448,	449,	0,	1505,	1060,	1150],
[63,	1852,	1130,	2295,	1009,	1348,	1372,	893,	528,	1690,	1524,	0,	1661,	1565],
[22,	1899,	859,	1516,	1125,	1061,	766,	1555,	1681,	1427,	1055,	1502,	0,	336],
[56, 1960, 735, 1595, 1009, 1138, 838, 1409, 1557, 1504, 1134, 1399, 194, 0]
]

function readMatrix(isReversed: boolean) {
    let array = []
    for (let i = 1; i < my_data[0].length; i++) {
        for (let j = 1; j < my_data.length; j++) {
            if (my_data[i][j] !== 0) {
                if (isReversed) {
                    array.push({
                        store1: my_data[0][j],
                        store2: my_data[i][0],
                        value: my_data[i][j]
                    })
                } else {
                    array.push({
                        store1: my_data[i][0],
                        store2: my_data[0][j],
                        value: my_data[i][j]
                    })
                }
            }
        }
    }
    return array;
}
async function writeArray(array: any[]) {
    return await Promise.all(array.map(async arr => {
        const newTime = await db.timeMatrix.create({
            data: {
                storeId1: arr?.store1,
                storeId2: arr?.store2,
                time: arr?.value
            }
        })
        return newTime;
    }))
}

export interface StoreLink {
    id: number;
    storeId1: number;
    storeId2: number;
    time: number;
    distance: number;
    // Предположим, что могут быть и другие метрики.
  }
  
  interface Edge {
    time: number;
    distance: number;
    // Другие параметры, если они есть.
  }
  
  export interface MetricWeights {
    time: number;
    distance: number;
    // Веса для других параметров.
  }

// Создание графа
function createGraph(data: any[]): Map<number, Map<number, Edge>> {
    const graph = new Map<number, Map<number, Edge>>();
    data.forEach(link => {
      const edge: Edge = { time: link?.time, distance: link?.distance };
      if (!graph.has(link?.storeId1)) graph.set(link?.storeId1, new Map());
      if (!graph.has(link?.storeId2)) graph.set(link?.storeId2, new Map());
      graph.get(link?.storeId1)!.set(link?.storeId2, edge);
      graph.get(link?.storeId2)!.set(link?.storeId1, edge);
    });
    return graph;
  }
  
  // Функция оценки
  function evaluateEdge(edge: Edge, weights: MetricWeights): number {
    return edge.time * weights.time + edge.distance * weights.distance;
    // Добавьте другие метрики по мере их добавления.
  }
  
  // Алгоритм Дейкстры
  function dijkstra(
    graph: Map<number, Map<number, Edge>>,
    start: number,
    end: number,
    weights: MetricWeights
  ): [string[], number] {
    const minHeap: Array<[number, number]> = []; // [current metric value, vertex]
    const values: Map<number, number> = new Map([...graph.keys()].map(key => [key, Infinity]));
    const previous: Map<number, number | null> = new Map([...graph.keys()].map(key => [key, null]));
  
    values.set(start, 0);
    minHeap.push([0, start]);
  
    while (minHeap.length > 0) {
      minHeap.sort((a, b) => a[0] - b[0]);
      const [currentValue, currentVertex] = minHeap.shift()!;
  
      if (currentVertex === end) {
        let step: number | null = end;
        const path: string[] = [];
        while (step !== null) {
          const prevStep = previous.get(step);
          if (prevStep !== null) {
            const edge = graph.get(prevStep)!.get(step)!;
            const segment = `${prevStep} -> ${step} [${edge.time} sec, ${edge.distance} m]`;
            path.unshift(segment);
          }
          step = prevStep;
        }
        return [path, currentValue];
      }
  
      for (const [neighbor, edge] of graph.get(currentVertex)!) {
        const newValue = currentValue + evaluateEdge(edge, weights);
        if (newValue < values.get(neighbor)!) {
          values.set(neighbor, newValue);
          previous.set(neighbor, currentVertex);
          minHeap.push([newValue, neighbor]);
        }
      }
   
    }
  
    return [[], Infinity]; // В случае, если путь не найден
  }

export default {
    readMatrix,
    writeArray,
    createGraph,
    dijkstra,
}
import * as fs from "fs";
import csv_parse from 'csv-parse';
import { db } from "../plugins/db";
// import pLimit from 'p-limit';

async function parse (_path) {
        const products = [];
      
        fs.createReadStream('./services/data_hakaton1.csv')
  .pipe(csv_parse.parse({ delimiter: ',' }))
  .on('data', (row) => {
    products.push({
      ID: parseInt(row[0]),
      Product_Name: row[1],
      Product_Cost: parseFloat(row[2]),
      Manufacture_Date: row[3],
      Expiry_Date: row[4],
      SKU: row[5],
      Store_Name: row[6],
      Store_Address: row[7],
      Region: row[8],
      Sale_Date: row[9],
      Quantity_Sold: parseFloat(row[10]),
      Product_Amount: parseFloat(row[11]),
      Product_Measure: row[12],
      Product_Volume: parseFloat(row[13]),
      Manufacturer: row[14]
    });
  })
  .on('end', async () => {
    console.log(products);
    const pLimitModule = await import('p-limit');
    const pLimit = pLimitModule.default;
    const limit = pLimit(10);
    await Promise.all(products.map(async (product) => {
        await limit(async () => {
            const _product = await db.product.findUnique({
                where: {
                    id: product.ID
                }
            });
            if (_product) return;
            let store = await db.store.findFirst({
                where: {
                    store_name: product.Store_Name
                }
            });
            if (!store) {
                store = await db.store.create({
                    data: {
                        store_name: product.Store_Name,
                        store_address: product.Store_Address,
                        region: product.Region
                    }
                });
            }

            const newProduct = await db.product.create({
                data: {
                    storeId: store.id,
                    product_name: product.Product_Name,
                    product_cost: product.Product_Cost,
                    manufacture_date: new Date(product.Manufacture_Date),
                    expiry_date: new Date(product.Expiry_Date),
                    sku: product.SKU,
                    sale_date: new Date(product.Sale_Date),
                    quantity_sold: product.Quantity_Sold,
                    product_amount: product.Product_Amount,
                    product_measure: product.Product_Measure,
                    product_volume: product.Product_Volume,
                    manufacturer: product.Manufacture_Date
                }
            });
            console.log(newProduct);
        });
    }));
    console.log("done");
  });
}

parse('');

export default {
    parse
}
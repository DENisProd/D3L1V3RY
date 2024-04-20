import * as fs from "fs";
import csv_parse from 'csv-parse';
import { db } from "../plugins/db";
// import pLimit from 'p-limit';
import pLimit from "@esm2cjs/p-limit";

// const limit = pLimit(1);

interface IProductLoad {
    ID: number;
    Product_Name: string;
    Product_Cost: number;
    Manufacture_Date: string;
    Expiry_Date: string;
    SKU: number;
    Store_Name: string;
    Store_Address: string;
    Region: string;
    Sale_Date: string;
    Quantity_Sold: number;
    Product_Amount: number;
    Product_Measure: string;
    Product_Volume: number;
    Manufacturer: string;
}

async function parse (_path: string) {
        const products: IProductLoad[] = [];
      
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
    // const pLimitModule = await import('p-limit');
    // const pLimit = pLimitModule.default;
    const limit = pLimit(100);
    await Promise.all(products.map(async (product, index) => {
        await limit(async () => {
            if (index === 0) return;
            if (product.ID) {
                const _product = await db.product.findUnique({
                    where: {
                        id: +product.ID
                    }
                });
                if (_product) return;
            }
            
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
            let manufacturer = await db.manufacturer.findFirst({
                where: {
                    manufacturer_name: product.Manufacturer
                }
            })
            if (!manufacturer) {
                manufacturer = await db.manufacturer.create({
                    data: {
                        manufacturer_name: product.Manufacturer,
                        manufacturer_address: "Ул. Рандомная 14",
                    }
                });
            }

            const newProduct = await db.product.create({
                data: {
                    storeId: store.id,
                    product_name: product.Product_Name,
                    product_cost: +product.Product_Cost,
                    manufacture_date: new Date(product.Manufacture_Date),
                    expiry_date: new Date(product.Expiry_Date),
                    sku: +product.SKU,
                    manufacturerId: manufacturer.id
                }
            });
            const newSale = await db.sale.create({
                data: {
                    sale_date: new Date(product.Sale_Date),
                    quantity_sold: +product.Quantity_Sold,
                    productId: +newProduct.id,
                    product_measure: product.Product_Measure,
                    product_volume: product.Product_Volume,
                }
            })
            console.log(newProduct);
        });
    }));
    console.log("done");
  });
}

export default {
    parse
}
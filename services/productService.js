const db = require("../database/db");

async function getAllProducts() {
    return await db.delayReadData();
}

async function getProductById(id) {
    let products = await db.delayReadData();
    return products.find((item) => item.id === id);
}

async function createProduct(productData) {
    let products = await db.readData();
    let newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    let newProduct = { id: newId, ...productData };
    products.push(newProduct);
    await db.writeData(products);
    return newProduct;
}

async function updateProduct(id, updateData) {
    let products = await db.readData();
    let index = products.findIndex((item) => item.id === id);
    if (index === -1) return null;
    products[index] = { id, ...updateData };
    await db.writeData(products);
    return products[index];
}

async function patchProduct(id, patchData) {
    let products = await db.readData();
    let index = products.findIndex((item) => item.id === id);
    if (index === -1) return null;
    products[index] = { ...products[index], ...patchData, id };
    await db.writeData(products);
    return products[index];
}

async function deleteProduct(id) {
    let products = await db.readData();
    let index = products.findIndex((item) => item.id === id);
    if (index === -1) return null;
    let deleted = products.splice(index, 1)[0];
    await db.writeData(products);
    return deleted;
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct
};

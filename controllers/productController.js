const productService = require("../services/productService");

async function getProducts(req, res) {
    try {
        let products = await productService.getAllProducts();
        return res.json(products);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
    }
}

async function getProductById(req, res) {
    try {
        let id = Number(req.params.id);
        let data = await productService.getProductById(id);
        if (!data) {
            return res.status(404).json({ error: "Product not found" });
        }
        return res.json(data);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
    }
}

async function createProduct(req, res) {
    try {
        let newProduct = await productService.createProduct(req.body);
        return res.status(201).json(newProduct);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
    }
}

async function updateProduct(req, res) {
    try {
        let id = Number(req.params.id);
        let updated = await productService.updateProduct(id, req.body);
        if (!updated) {
            return res.status(404).json({ error: "Product not found" });
        }
        return res.json(updated);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
    }
}

async function patchProduct(req, res) {
    try {
        let id = Number(req.params.id);
        let patched = await productService.patchProduct(id, req.body);
        if (!patched) {
            return res.status(404).json({ error: "Product not found" });
        }
        return res.json(patched);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
    }
}

async function deleteProduct(req, res) {
    try {
        let id = Number(req.params.id);
        let deleted = await productService.deleteProduct(id);
        if (!deleted) {
            return res.status(404).json({ error: "Product not found" });
        }
        return res.json(deleted);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
    }
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct
};

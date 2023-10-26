import { Router } from "express";
import ProductManager from "../classes/productManager.classes.js";

const router = Router();

const productManager = new ProductManager

router.get('/', async (req, res) => {
    const data = await productManager.getProducts(req.query.limit)
    res.send(data);
});

router.get('/:id', async (req, res) => {
    const data = await productManager.getProductById(req.params.id)
    res.send(data)
})

router.post('/', async (req, res) => {
    const data = await productManager.addProducts(req.body);   
    res.send(data);
});

router.delete('/:id', async (req, res) => {
    const data = await productManager.deleteProduct(req.params.id)
    res.send(data);
})

router.put('/:id', async (req, res) => {
    const data = await productManager.updateProduct(req.params.id, req.body)
    res.send(data);  
})

export default router;
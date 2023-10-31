import { Router } from "express";
import CartManager from "../classes/cartManager.classes.js";

const router = Router();

const cartManager = new CartManager

router.get('/', async (req, res) => {
    const data = await cartManager.getCarts()
    res.send(data);
})

router.get('/:id', async (req, res) => {
    const data = await cartManager.getCartById(req.params.id)
    res.send(data)

})

router.post('/', async (req, res) => {
    const data = await cartManager.addCart();
    res.send(data);
})

router.post('/:cid/products/:pid', async (req, res) => {  
    const data = await cartManager.addProductToCart(req.params.cid, req.params.pid);
    res.send(data)
})

export default router;
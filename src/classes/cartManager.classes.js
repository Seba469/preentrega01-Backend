import fs from 'fs'
import {v4 as uuidV4} from 'uuid'
import ProductManager from './productManager.classes.js'

const path = './src/classes/json/carritos.json'
const productManager = new ProductManager

export default class CartManager{
    getCarts = async () => {
        try{
            const data = await fs.promises.readFile(path, "utf-8");
            const carts = JSON.parse(data)
        
            return carts;
        }
        catch (error){
            console.log(`Ocurrio un error ${error.message}`)
        }
    }

    getCartById = async (id) => {
        try{
            const carts = await this.getCarts();
            
            const carroFiltrado = carts.find(cart => cart.id === id)

            if (carroFiltrado.length === 0){  
                return "No se encontro ese carro"
            }

            return carroFiltrado
        }
        catch (error){
            console.log(`Ocurrio un error ${error.message}`)
        }
 
    }
    
    addCart = async () => {
        try{
            const carts = await this.getCarts();
            
            carts.push({ id: uuidV4(), products: [] });
            
            await fs.promises.writeFile(path, JSON.stringify(carts, null, "\t"));
            return "Carro creado correctamente"
        }
        catch(error){
            console.log(`Ocurrio un error ${error.message}`)
        }
    }

    addProductToCart = async (cartId, productId) => {
        try{
            const cartById = await this.getCartById(cartId);
            const product = await productManager.getProductById(productId)
            const carts = await this.getCarts()

            //Verifico q exista el carro
            if (typeof cartById === "string"){
                return "El carro no existe"
            }
            //Verifico q exista el producto
            if (typeof product === "string"){
                return "El producto no existe"
            }
            console.log(cartById)
            const index = cartById.products.findIndex(prod => prod.id === productId)

            if (index === -1) {
                console.log(cartById.products.push({ id: productId, quantity: 1 }))
            } else {
                cartById.products[index].quantity++;
            }

            const cartIndex = carts.findIndex(cart => cart.id === cartId)
            carts[cartIndex] = cartById
        
            await fs.promises.writeFile(path, JSON.stringify(carts, null,"\t" ))
            return "El producto se agrego correctamente al carro"
        }
        catch(error){
            console.log(`Ocurrio un error ${error.message}`)
        }
    }

    
}
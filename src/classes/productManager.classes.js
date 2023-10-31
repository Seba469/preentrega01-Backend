import fs from 'fs'
import {v4 as uuidV4} from 'uuid'

const path = './src/classes/json/productos.json'

export default class ProductManager{

    getProducts = async (limit) => {
        try{
            const data = await fs.promises.readFile(path, "utf-8")
            const products = JSON.parse(data)
                
            if (limit != undefined){
                let i
                let productsLimits = []

                for (i = 0; i < limit; i++){
                    productsLimits.push(products[i])
                }

                return productsLimits
            }     
            return products
        }
        catch (error){
            console.log(`Ocurrio un error ${error.message}`)
        }    
    }

    getProductById = async (id) => {
        try {
            const products = await this.getProducts()
        
            const productoFiltrado = products.filter(prod => prod.id === id)

            if (productoFiltrado.length === 0){  
                return "No se encontro ese producto"
            }

            return productoFiltrado
  
        } 
        catch (error) {
            console.log(`Ocurrio un error ${error.message}`)
        }
    }

    addProducts = async (newProduct) => {
        try{
            const products = await this.getProducts()

            const {title, description, price, thumbnail, code, stock} = newProduct 

            if(title === undefined||description === undefined|| price === undefined|| thumbnail === undefined|| code === undefined|| stock === undefined){
                return "Debe completar todos los campos"
            }
            
            const index = products.findIndex(p => p.code === code )
    
            if (index != -1){
                return "Codigo repetido"
            }

            newProduct.id = uuidV4()
    
            products.push(newProduct)
            await fs.promises.writeFile(path, JSON.stringify(products, null, '\t'))
            return "Producto agregado"
        }
        catch(error){
            console.log(`Ocurrio un error ${error.message}`)
        }  
    }

    deleteProduct = async (id) => {
        try {
            const products = await this.getProducts()
            const product = await this.getProductById(id)

            if (typeof product === "string"){
                return product
            }

            const productosFiltrados = products.filter(prod => prod.id != id)

            await fs.promises.writeFile(path, JSON.stringify(productosFiltrados, null, '\t'))
            return "Producto eliminado correctamente"
        } 
        catch (error) {
            console.log(`Ocurrio un error ${error.message}`)
        }
    }   

    updateProduct = async (id, newData) => {
        try{
            const products = await this.getProducts()
            const product = await this.getProductById(id)

            if (typeof product === "string"){
                return product
            }

            const index = products.findIndex(prod => prod.id === id)
                
            const newProduct = {...products[index]}
            for (let key in newData){
                if (key !== "id"){
                    newProduct[key] = newData[key]
                }
            }

            products[index] = newProduct
            
            await fs.promises.writeFile(path, JSON.stringify(products, null, '\t'))
            return "Producto actualizado correctamente"
        }
        catch(error){
            console.log(`Ocurrio un error ${error.message}`)
        }
    }
}


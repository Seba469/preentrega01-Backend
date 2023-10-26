import express from "express";
import routerProducts from "./routes/products.route.js"

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

/*const routerProducts = new RouterProducts();
app.get('/products', async (req, res) => {
  const data = req.query.limit

  res.send(await routerProducts.getProducts(data))
});

app.get('/products/:id', async (req, res) => {
    const data = req.params.id;

    res.send(await routerProducts.getProductById(data))
});-*/

app.use('/api/products/', routerProducts)
app.listen(8080, () => {
  console.log('Servidor escuchando en el puerto 8080.');
});
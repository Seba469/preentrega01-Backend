import express from "express";
import routeProducts from "./routes/products.route.js"
import routeCarts from "./routes/carts.route.js"

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api/products/', routeProducts)
app.use('/api/carts/', routeCarts)
app.listen(8080, () => {
  console.log('Servidor escuchando en el puerto 8080.');
});
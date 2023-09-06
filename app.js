require('dotenv').config()
require('express-async-errors')
const express = require('express');
const app = express();

const connectDB = require('./db/connect')
const productsRouter = require('./routes/products')

const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');
const { getAllProductsStatic } = require('./controllers/products');

//middlewares
app.use(express.json());

//routes
app.get('/', (req, res)=>{
    res.send('<h1>Store API</h1><a href="/api/v1/products">product link</a>');
})

app.use('/api/v1/products', productsRouter)

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`server is listening to port ${port}`))
    } catch (error) {
        console.log(error);
    }
}

start()
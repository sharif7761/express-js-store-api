require('dotenv').config();


const express = require('express');
const app = express();

const  notFoundMiddleware = require('./middleware/not-found');
const  errorMiddleware = require('./middleware/error-handler');

app.use(express.json())

// routes
app.get('/', (req, res) => {
    res.send('<h1>Store Api</h1><a href="/api/v1/products">Products</a>')
})

app.use(notFoundMiddleware)
app.use(errorMiddleware)

const port = process.env.PORT || 3000
const start = async () => {
    try {
        app.listen(port, console.log(`Server is listening port ${port}...`))
    }
    catch (error){
        console.log(error)
    }
}

start()
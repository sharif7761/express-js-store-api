const Product = require('../models/product')

const getAllProducts = async (req, res) => {
    console.log(req.query)
    const products = await Product.find(req.query)
    res.status(200).json({products, nbHits: products.length })
}

module.exports = {
    getAllProducts
}
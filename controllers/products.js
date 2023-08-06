const Product = require('../models/product')

const getAllProducts = async (req, res) => {
    console.log(req.query)
    // use all query
   // const products = await Product.find(req.query)

    // avoid unnecessary search data
    const { featured } = req.query

    const queryObject = {}
    if(featured){
        queryObject.featured = featured === 'true' ? true : false;
    }
    const products = await Product.find(queryObject)
    res.status(200).json({products, nbHits: products.length })
}

module.exports = {
    getAllProducts
}
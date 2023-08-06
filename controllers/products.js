const Product = require('../models/product')

const getAllProducts = async (req, res) => {
    // use all query
   // const products = await Product.find(req.query)

    // avoid unnecessary search data
    const { featured, company, name } = req.query

    const queryObject = {}
    if(featured){
        queryObject.featured = featured === 'true' ? true : false;
    }

    if(company){
        queryObject.company = company;
    }

    if(name){
        queryObject.name = { $regex: name, $options: 'i'};
    }
    const products = await Product.find(queryObject)
    res.status(200).json({products, nbHits: products.length })
}

module.exports = {
    getAllProducts
}
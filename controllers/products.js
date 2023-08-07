const Product = require('../models/product')

const getAllProducts = async (req, res) => {
    // use all query
   // const products = await Product.find(req.query)

    // avoid unnecessary search data
    const { featured, company, name, sort, fields } = req.query

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


    let result = Product.find(queryObject)
    if(sort){
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    } else {
        result = result.sort('createdAt')
    }

    if(fields){
        const fieldsList = fields.split(',').join(' ')
        result = result.select(fieldsList)
    }

    const products = await result
    res.status(200).json({products, nbHits: products.length })
}

module.exports = {
    getAllProducts
}
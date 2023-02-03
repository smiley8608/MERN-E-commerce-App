import express from "express"
import { productmodel } from "../model/productModel"
import { updatedRequest } from "../Interface"


export const getAllProducts = (req: updatedRequest, res: express.Response) => {

    const { rangestart, rangeend, sortby, search } = req.query
    const category = req.body.catagories
    console.log({ rangestart, rangeend, sortby, search, category: category });


    if (sortby !== 'relevance') {
        let sortorder: any = -1
        if (sortby === "lth") {
            sortorder = 1
        } else {
            sortorder = -1
        }


        if (category.length >= 1) {
            let aggregatorWithSearch = [{ $match: { $text: { $search: search as string }, price: { $gte: Number(rangestart), $lte: Number(rangeend) }, category: { $in: category } } }, { $sort: { price: sortorder } }]
            let aggregatorWithoutSearch = [{ $match: { price: { $gte: Number(rangestart), $lte: Number(rangeend) }, category: { $in: category } } }, { $sort: { price: sortorder } }]

            productmodel.aggregate(search ? aggregatorWithSearch : aggregatorWithoutSearch)
                .then(response => {
                    res.json({ products: response })
                    return
                })
                .catch(err => {
                    res.json({ message: err })
                    return
                })
            return
        }

        let aggregatorWithSearch = [{ $match: { $text: { $search: search as string }, price: { $gte: Number(rangestart), $lte: Number(rangeend) } } }, { $sort: { price: sortorder } }]
        let aggregatorWithoutSearch = [{ $match: { price: { $gte: Number(rangestart), $lte: Number(rangeend) } } }, { $sort: { price: sortorder } }]
        productmodel.aggregate(search ? aggregatorWithSearch : aggregatorWithoutSearch)
            .then(response => {
                res.json({ products: response })
                return
            })
            .catch(err => {
                res.json({ message: err })
                return
            })
        return
    }

    if (category?.length >= 1) {

        let aggregatorWithSearch = { price: { $gte: Number(rangestart), $lte: Number(rangeend) }, category: category, $text: { $search: search as string } }
        let aggregatorWithoutSearch = { price: { $gte: Number(rangestart), $lte: Number(rangeend) }, category: category }
        console.log(search ? aggregatorWithSearch : aggregatorWithoutSearch);

        productmodel.find(search ? aggregatorWithSearch : aggregatorWithoutSearch)
            .then(response => {
                console.log("runner");
                return res.json({ products: response })
            })
            .catch(err => {
                return res.json({ message: err })
            })
        return
    }

    let aggregatorWithSearch = { price: { $gte: rangestart, $lte: rangeend }, $text: { $search: search as string } }
    let aggregatorWithoutSearch = { price: { $gte: rangestart, $lte: rangeend } }
    productmodel.find(search ? aggregatorWithSearch : aggregatorWithoutSearch)
        .then(response => {
            res.json({ products: response })
        })
        .catch(err => {


            res.json({ message: err })
        })
}


export const searchProduct = (req: updatedRequest, res: express.Response) => {
    const { id } = req.params
    productmodel.findById(id)
        .then(foundResponse => {
            return res.json({ product: foundResponse })
        })
        .catch(err => {
            return res.json({ message: err })
        })
}

export const Addproducts = (req: express.Request, res: express.Response) => {
    console.log(req.body);

    const { title, discription, price, rating, stock, brand, catagories, productphotos } = req.body
    productmodel.findOne({ title: title, brand: brand })
        .then((existedproduct) => {
            if (existedproduct) {
                return res.json({ message: 'This product allready exists' })
            } else {
                productmodel.create({ title: title, description: discription, price: price, rating: rating, stock: stock, brand: brand, category: catagories, thumbnail: `http://localhost:4000/${req.file?.path}` })
                    .then(response => {
                        return res.json({ message: 'product updated successfully' })
                    }).catch(error => {
                        console.log(error);

                    })
            }
        })
}

export const DeleteProduct = (req: express.Request, res: express.Response) => {
    const { id } = req.body
    console.log(req.body)
    console.log(id);

    productmodel.findByIdAndRemove({ _id: id })
        .then(result => {
            return res.json({ message: 'Products deleted successfully' })
        }).catch(error => {
            return res.json({ message: error })
        })

}
export const getProduct = (req: express.Request, res: express.Response) => {

    console.log(req.body)
    const { id } = req.body
    productmodel.findOne({ _id: id })
        .then(result => {
            if (!result) {
                return res.json({ message: 'these product does not exist!' })
            } else {
                console.log(result)
                return res.json({ product: result })

            }
        })
}

export const UpdateProducts = (req: express.Request, res: express.Response) => {
    const { _id, title, discription, price, stock, rating, catagories, brand, productphotos } = req.body
    console.log("req.file", req.file)
    console.log("req.body", req.body);
    if (req.file === undefined) {
        productmodel.findByIdAndUpdate({ _id: _id }, { title: title, description: discription, price: price, stock: stock, rating: rating, category: catagories, brand: brand, thumbnail: productphotos })
            .then(result => {


                if (!result) {
                    return res.json({ message: 'products cannot updated' })
                } else {
                    console.log("result", result);

                    return res.json({ message: 'producted successfully' })
                }
            })

    } else {
        productmodel.findByIdAndUpdate({ _id: _id }, { title: title, description: discription, price: price, stock: stock, rating: rating, category: catagories, brand: brand, thumbnail: `http://localhost:4000/${req.file?.path}` })
            .then(result => {


                if (!result) {
                    return res.json({ message: 'products cannot updated' })
                } else {
                    console.log("result", result);

                    return res.json({ message: 'producted successfully' })
                }
            })

    }


}
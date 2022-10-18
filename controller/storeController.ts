import express from "express"
import { productmodel } from "../model/productModel"
import { updatedRequest } from "../Interface"


export const getAllProducts = (req:updatedRequest,res:express.Response) => {

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
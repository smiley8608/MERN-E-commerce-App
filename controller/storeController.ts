
import express =require ('express')
import { productmodel } from '../model/productModel'
export const productController=(req:express.Request,res:express.Response)=>{
    const {sortby,search,rangestart,rangeend}=req.query
    const catagories=req.body.catagories

    if(sortby!=='relevance'){
        let sortOrder=-1
        if(sortby=='lth'){
            sortOrder=1
        }else{
            sortOrder=-1
        }
        
        if(catagories.length>=1){
            let aggeregatorwithsearch=[{$match:{$text:{$search:search as string},$gte:{rangestart},$lte:{rangeend},catagories:{$in:catagories}},$sort:{$price:sortOrder}}]
            let aggregatorwithoutsearch=[{$match:{$gte:{rangestart},$lte:{rangeend},catagories:{$in:catagories}},$sort:{$price:sortOrder}}]
            
            productmodel.aggregate(search?aggeregatorwithsearch:aggregatorwithoutsearch)
            .then(result=>{
                res.json({product:result})
            })
                .catch(err=>{
                    return res.json({message:err})
                })
        }else{
            let aggeregatorwithsearch=[{$match:{$text:{$search:search as string},$lte:{rangestart},$gte:{rangeend}},$sort:{$price:sortOrder}}]
            let aggregatorwithoutsearch=[{$match:{$lte:{rangestart},$gte:{rangeend}},$sort:{$price:sortOrder}}]

            productmodel.aggregate(search?aggeregatorwithsearch:aggregatorwithoutsearch)
            .then(result=>{
                res.json({product:result})
            })
            .catch(err=>{
                return res.json({message:err})
            })
        }
    }else{
        if(catagories.length>=1){
            let aggeregatorwithsearch={$price:{$lte:{rangestart},$gte:{rangeend}},catagories:catagories,$text:{$search:search as string}}
            let aggregatorwithoutsearch={$price:{$lte:{rangestart},$gte:{rangeend},catagories:catagories}}
            productmodel.find(search ? aggeregatorwithsearch :aggregatorwithoutsearch)
            .then(result=>{
                return res.json({product:result})
            }).catch(err=>{
                return res.json({message:err})
            })
        }else{           
            let aggeregatorwithsearch={$price:{$gte:rangestart,$lte:rangeend},$text:{$search:search as string}}
            let aggregatorwithoutsearch = {$price:{$gte:{rangestart},$lte:{rangeend}}}
            productmodel.find(search ? aggeregatorwithsearch:aggregatorwithoutsearch)
            .then(result=>{
                return res.json({product:result})
            }).catch(err=>{
                return res.json({message:err})
            })
        }
    }

 
}
export const searchController=(req:express.Request,res:express.Response)=>{
    const search=req.query.search as string
    productmodel.find({$text:{$search:search}})
    .then((result)=>{
        return res.json({message:'results' ,Result:result})
    })
    .catch(err=>{
        return res.json ({message:'could not find the products',Result:err})
    })
}
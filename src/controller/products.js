
import dotenv from "dotenv"
dotenv.config()
import Product from "../model/products"
import joi from "joi";
const productSchema = joi.object({
    name: joi.string().required(),
    price: joi.number().required()
})


export const appProducts = async function(req,res){
    try {
        const {error} = productSchema.validate(req.body)
        if(error){
            return res.status(400).json({
                message: error.details[0].message
            })
        }
        const product = await Product.create(req.body)
        if(!product){
            return res.json({
                message: "Không thêm được sản phẩm"
            })
        }
        return res.json({
            message: "Thêm sản phẩm thành công",
            data: product
        })
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}

export const getAllProduct = async function(req,res){
    try {
        const product = await Product.find()
        if(!product){
            return res.json({
                message: "Không có sản phẩm nào"
            })
        }
        return res.json(product)
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}

export const getOneProduct = async function(req,res){
    try {
        const product  = await Product.findById(req.params.id)
        if(!product){
            return res.json({
                message: "Không tìm thấy sản phẩm"
            })
        }
        return res.json(product)
    } catch (error) {
        return res.json({
            message: error
        })
    }
}

export const remove = async function(req,res){
  try {
    const removeProduct = await Product.findByIdAndDelete(req.params.id,{$set: req.body},{new: true})
    if(removeProduct){
        return res.json({
            message: "Xóa thành công"
        })
    }else{
        return res.json({
            message: "Xóa không thành công"
        })
    }
  } catch (error) {
    return res.status(400).json({
        message: error
    })
  }
}

export const update = async function(req,res){
    try {
        const {error} = productSchema.validate(req.body)
        if(error){
            return res.status(400).json({
                message: error.details[0].message
            })
        }
        const updateProduct = await Product.findByIdAndUpdate(req.params.id,{$set: req.body},{new: true})
        if(updateProduct){
            return res.json({
                message: "Cập nhật thành công",
                data: updateProduct
            })
        }else{
            return res.json({
                message: "Cập nhật không thành công"
            })
        }
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}
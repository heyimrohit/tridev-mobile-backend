import { NextFunction, Request, Response } from 'express'
import httpResponse from '../util/httpResponse'
import responseMessage from '../constant/responseMessage'
import httpError from '../util/httpError'
import quicker from '../util/quicker'
import Product from '../model/Product'

export default {
    self: (req: Request, res: Response, next: NextFunction) => {
        try {
            httpResponse(req, res, 200, responseMessage.SUCCESS)
        } catch (error) {
            httpError(next, error, req, 500)
        }
    },
    health: (req: Request, res: Response, next: NextFunction) => {
        try {
            const healthData = {
                application: quicker.getApplicationHealth(),
                system: quicker.getSystemHealth(),
                timestamp: Date.now()
            }

            httpResponse(req, res, 200, responseMessage.SUCCESS, healthData)
        } catch (err) {
            httpError(next, err, req, 500)
        }
    },
    getAllProducts: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const products = await Product.find()
            httpResponse(req, res, 200, responseMessage.SUCCESS, products)
        } catch (err) {
            httpError(next, err, req, 500)
        }
    },
    createProduct: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { productName, price, offerPrice, image, rating } = req.body

            if (!productName || !price) {
                throw new Error(responseMessage.BAD_REQUEST('productName or price'))
            }

            const existingProduct = await Product.findOne({ productName })

            if (existingProduct) {
                throw new Error(responseMessage.ALREADY_EXISTS('Product with this name'))
            }

            const newProduct = new Product({
                productName,
                price,
                offerPrice,
                image,
                rating
            })

            const savedProduct = await newProduct.save()

            httpResponse(req, res, 201, responseMessage.SUCCESS, savedProduct)
        } catch (err) {
            httpError(next, err, req, 500)
        }
    }
}

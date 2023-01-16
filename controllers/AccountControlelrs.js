import mongoose from "mongoose";
import Product from "../models/ProductModel.js"
export const getAccountPage = async (req, res) => {

    if(req.user) {
        const ads = await Product.find({author: req.user.id})
        res.render('account', {data: ads, user: req.user});
    } else {
        res.render('./status/401')
    }
}


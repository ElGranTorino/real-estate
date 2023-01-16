import Product from '../models/ProductModel.js'
import mongoose from 'mongoose'
import User from '../models/UserModel.js'
import { request } from 'express'
import { productValidation } from '../validation/SchemaValidation.js'

export const getStoreCategories = async (req, res) => {
    let products;

    // Можливий варіант коли на сервер приходять не валідні дані
    // Тоиу необхідно надати їм значень по замовчуванню
    const rooms_from = parseInt(req.query.rooms_from) || 1,
          rooms_to = parseInt(req.query.rooms_to) || 64,
          square_from = parseInt(req.query.square_from) || 1,
          square_to = parseInt(req.query.square_to) || 4096000,
          price_from = parseInt(req.query.price_from) || 1,
          price_to = parseInt(req.query.price_to) || 1000000000;
    
    // Шукаємо оголошення, які підпадають під задані нами параметри
    products = await Product.find({
        "rooms": {$gte: rooms_from, $lte: rooms_to},
        "square": {$gte: square_from, $lte: square_to},
        "price": {$gte: price_from, $lte: price_to},
    }).limit(20)
        
    const data = {
        title: 'Сайт з продажу нерухомості',
        user: req.user,
        products: products,
        query: req.query
    };
    
    res.render('store', data)
} 

export const createProduct = async (req, res) => {
    // Вивести помилку
    const {error} = productValidation(req.body);

    if(error){
        return res.status(400).send(error.details[0].message)
    };

    // Массив з шляхами файлів, який ми будемо передавати в базу даних
    const filePaths = []
    req.files.forEach((file) => {
        let name = file.path;
        filePaths.push(name)
    })

    // Нове оголошення
    const product = new Product({
        author: req.user.id,
        title: req.body.title,
        body: req.body.body,
        price: parseInt(req.body.price),
        thumb: req.body.thumb,
        images: filePaths,
        floor: parseInt(req.body.floor),
        square: parseInt(req.body.square),
        rooms: parseInt(req.body.rooms),
        heating: req.body.heating,
        furniture: Boolean(req.body.furniture),
        refit: req.body.refit,
        infrastructure: req.body.infrastructure
    });
    
    try {
        const savedProduct = await product.save(); // Зберігаємо оголошення в БД
        res.status(200).redirect('/account');
    } catch(err){
        res.status(400).send(err)
    }
}
export const removeProductDetails = async (req, res) => {
    const product = await Product.findOne({id: req.params.id});
    const author = product.author;

    // Перевіряємо чи ID автора оголошення збігається з ID
    // авторизованого користувача
    if(req.user.id === author.toString()){ 
        await Product.findOne({id: req.params.id}).deleteOne(); // Видаляємо оголошення
        res.status(200).redirect('/store')
    } else {
        // Якщо у користувача немає прав на цю дію - відправляємо йому сторінку 403
        res.status(403).redirect('/status/403');
    }
    
}
export const getProductDetails = async (req, res) => {
    const id = req.params.id;
    
    try {
        const product = await Product.findOne({_id: id});
        const author = await User.findOne({_id: product.author})
        res.render('room-details', { product: product, user: req.user, author: author});
    } catch(err) {
        res.status(400).send('Invalid request')
    }

    
}

export const productCreation = async (req, res) => {
    if(req.user){
        res.render('edit', {user: req.user})
    } else {
        res.render('./status/401')
    }
}
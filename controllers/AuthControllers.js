// Імпортуємо необхідні моделі
import User from "../models/UserModel.js";
import { registrationValidatation, loginValidation } from "../validation/SchemaValidation.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";
import jwt from "jsonwebtoken";


export const getLogin = (req, res) => {
    if(req.user){
        res.status(200).redirect('/');
    } else {
        res.render('login', {title: 'Сайт з продажу нерухомості'});
    }
};

export const getRegistration = (req, res) => {
    if(req.user){
        res.status(200).redirect('/')
    } else {
        res.render('registration', {title: 'Сайт з продажу нерухомості'});
    }
};

export const logOut = (req, res) => {
    if(req.user){
        res.cookie('auth_token', '', {maxAge: 0});
        res.status(200).redirect('/');
    } else {
        res.redirect('/login')
    }
}

export const postLogin = async (req, res) => {
    const { error } = loginValidation(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    const user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).send('Account with this email does not exist');
    
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid password');

    // Створення і присвоєня токену
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.cookie('auth_token', token, { maxAge: 86400000, httpOnly: true });
    res.status(200).redirect('/');
    
};

export const postRegistration = async (req, res) => {
    // Валідація введених користувачем даних
    const { error } = registrationValidatation(req.body);
    // Якщо дані введено неправильно - повернути помилку
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    // Перевірка чи заданий користувачем e-mail іже існує
    const emailExists = await User.findOne({email: req.body.email})
    if(emailExists) return res.status(400).send('Email already exists');

    // Хешування пароля
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    // Створюємо екземпляр класу користувача
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
    });

    // Зберігаємо дані про користувача в базі
    try {
        const savedUser = await user.save();
        res.status(200).redirect('/')
        
    } catch(err){
        res.status(400).send(err)
    }
};
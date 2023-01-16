// Імпортуємо необхідні JavaScript пакети
import express from "express";
import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "express";
import cookieParser from "cookie-parser";
import colors from "colors";
import Table from "cli-table";

import authRoutes from "./routes/AuthRoutes.js";
import storeRoutes from "./routes/StoreRoutes.js";
import accountRoutes from "./routes/AccountRouters.js"

import { auth } from "./middleware/verifyToken.js";
import { logger } from "./middleware/logger.js";


dotenv.config({path: './config/.env'});
const date = new Date();
const template = `[${date.getFullYear()}-${date.getMonth('2-digit')}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}]`;

//Підключаємось до бази даних
mongoose.connect(process.env.DB_CONNECT, () => {
    console.log(template + colors.yellow('   З`єднання з базою даних успішно встановлено'));
})


// Імпортуємо роути


const __dirname = path.resolve()
// Порт в мережі на якому буде запускатись сервер
const PORT = process.env.PORT || 3000



const app = express();

// Middleware для отримання данних від користувача
app.use(express.json());
app.use(express.urlencoded());

// Middleware для роботи з кукі
app.use(cookieParser());

// Вказуємо шлях, в якому будуть зберігатись
// Статичні файли (Шрифти, Зображення, Іконки, тощо)
app.use('/public',express.static(path.join(__dirname, '/public')));
app.use('/img',express.static(path.join(__dirname, '/public/img')));
app.use('/css',express.static(path.join(__dirname, '/public/css')));
app.use('/js',express.static(path.join(__dirname, '/public/js')));
app.use('/uploads',express.static(path.join(__dirname, '/public/img/uploads')));
// Встановлюємо шаблонізатор pug, щоб веб сервер міг інтерпретувати
// Файли з розширенням .pug
app.set('view engine', 'pug');

// Прописуємо шлях в якому будуть зберігатись шаблони
// майбутніх веб сторінок
app.set('views', path.resolve(__dirname, 'public/views'));

// Роути
app.use(authRoutes);
app.use(storeRoutes);
app.use(accountRoutes);

// Головна сторінка
app.get('/',auth, logger, (req, res) => {
    const data = {
        title: 'Сайт з продажу нерухомості',
        user: req.user,
    };
    res.render('index', data);
})

// Сторінка 404
app.get('**', logger, (req, res) => {
    res.render('./status/404')
});



// instantiate



// Запускаємо веб сервер
app.listen(PORT, () => {
    var table = new Table({
        head: ['', '']
      , colWidths: [30 ,30]
    });
    
    table.push(
        ['Автор', 'Сайт з продажу нерухомості'],
        ['Виконаний', 'Вівторок 31 Травня, 2022']
    );
    console.log(table.toString());
    console.log(template + colors.yellow('   Сервер запущено на порті 3000'));
})
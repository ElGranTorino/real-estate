// Імпортуємо клас Router з пакету ExpressJs
import { Router } from "express";
import { auth } from "../middleware/verifyToken.js";
import { logger } from "../middleware/logger.js";
// Імпортуємо необхідні контроллери
import { getLogin, getRegistration, logOut, postLogin, postRegistration } from "../controllers/AuthControllers.js";

// Створюємо новий екземпляр роутeра
const router = Router();

// Стоврюємо кінцеві точки (endpoints) 
router.get('/login', auth,logger, getLogin);
router.get('/signup', auth,logger, getRegistration);
router.post('/login', auth,logger, postLogin);
router.post('/signup', auth,logger, postRegistration);
router.get('/logout', auth,logger, logOut);
// Експортуємо экземпляр класу
export default router;
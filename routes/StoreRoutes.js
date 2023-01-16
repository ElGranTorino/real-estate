import { Router } from 'express';
import { auth } from '../middleware/verifyToken.js';
import { logger } from '../middleware/logger.js';
import {getStoreCategories, getProductDetails, createProduct, productCreation, removeProductDetails} from '../controllers/StoreControllers.js';
import multer from 'multer';

// Объект хранилища, в нем хранятся настройки для загрузки изображений на сайт
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/img/uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname.replace(/\$\s\@\#\%\^\&\*\(\)\*/, ""));
    }
});

const upload = multer({storage: storage});
const router = Router();

router.get('/store', auth,logger, getStoreCategories); // http://website.com/store
router.get('/details/:id', auth, logger, getProductDetails); // http://website.com/details/42039479023490
router.get('/delete/:id', auth, logger, removeProductDetails); // http://website.com/delete/390489058490
router.post('/new', auth,logger, upload.array('images', 10), createProduct); // http://website.com/new
router.get('/new', auth,logger, productCreation); // http://website.com/new
export default router;
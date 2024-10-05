import express from 'express';
import { authenticateJWT } from '../middleware/authMiddleware';
import { addArticle, editArticle, getArticles, getCategories, deleteArticle, getArticle, searchArticles } from '../controllers/articlesController';
import multer from 'multer';


const router = express.Router();
const upload = multer();

router.get(
	"/",
	authenticateJWT,
    searchArticles
);
router.get(
	"/article/:id",
	authenticateJWT,
    getArticle
);
router.post(
	"/new",
	authenticateJWT,
    upload.single('image'),
    addArticle
);
router.post(
	"/edit/:id",
	upload.single('image'),
	authenticateJWT,
    editArticle
);
router.delete(
	"/delete/:id",
	authenticateJWT,
    deleteArticle
);
router.get(
	"/categories",
	authenticateJWT,
    getCategories
);
router.get(
	"/search",
	authenticateJWT,
    searchArticles
);
export default router;

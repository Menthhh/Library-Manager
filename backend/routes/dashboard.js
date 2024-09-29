import express from 'express';
import {
    getAllBooks,
    getBook,
    getNumberOfBooks,
    getCategories,
    getBookById

} from '../controllers/dashboard.js';

const router = express.Router();

router.get('/', getAllBooks);
router.get('/search', getBook);
router.get('/numberOfBooks', getNumberOfBooks)
router.get('/categories', getCategories)
router.get('/book/:id', getBookById)

export default router;
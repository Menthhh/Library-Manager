import express from 'express';
import {
    getAllBooks,
    getBook,
    getNumberOfBooks,
    getCategories

} from '../controllers/dashboard.js';

const router = express.Router();

router.get('/', getAllBooks);
router.get('/search', getBook);
router.get('/numberOfBooks', getNumberOfBooks)
router.get('/categories', getCategories)

export default router;
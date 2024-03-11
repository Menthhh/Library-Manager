import express from 'express';
import {
    getAllBooks,
    getBook
} from '../controllers/dashboard.js';

const router = express.Router();

router.get('/', getAllBooks);
router.get('/search', getBook);

export default router;
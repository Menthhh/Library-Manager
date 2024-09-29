import express from 'express';
import { borrowBook, returnBook,displayBorrowedBooks } from '../controllers/borrow.js';


const router = express.Router();

router.post('/borrow', borrowBook);
router.post('/return', returnBook);
router.get('/display', displayBorrowedBooks);


export default router;
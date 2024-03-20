
import pool from '../db.js';


export const borrowBook = async (req, res) => {
    const { book_id, user_id, start_date, end_date } = req.body;

    try {
        const menbook = await pool.query('SELECT * FROM muslimahbooks WHERE id = $1 ', [book_id]);
        const womenbook = await pool.query('SELECT * FROM muslimeenbooks WHERE id = $1 ', [book_id]);
        if (menbook.rows.length === 0 && womenbook.rows.length === 0) {
            return res.status(400).json({ message: 'Book not found' });
        }

        // Log book details
        console.log('Borrowing book:', menbook.rows[0] || womenbook.rows[0]);

        // Update book status to unavailable
        const updateBookStatus = await pool.query('UPDATE muslimahbooks SET status = $1 WHERE id = $2', ['unavailable', book_id]);
        const updateBookStatus2 = await pool.query('UPDATE muslimeenbooks SET status = $1 WHERE id = $2', ['unavailable', book_id]);


        const borrowedBook = await pool.query(
            'INSERT INTO borrowedbooks (book_id, user_id, start_date, end_date) VALUES ($1, $2, $3, $4)',
            [book_id, user_id, start_date, end_date]
        );






        res.status(201).json(menbook.rows[0] || womenbook.rows[0]);
    } catch (error) {
        console.error('Error borrowing book:', error.message);
        res.status(500).send("Server Error");
    }
}


export const returnBook = async (req, res) => {
    const { book_id, user_id, return_date } = req.body;
    try {

        const menbook = await pool.query('SELECT * FROM muslimahbooks WHERE id = $1 ', [book_id]);
        const womenbook = await pool.query('SELECT * FROM muslimeenbooks WHERE id = $1 ', [book_id]);
        if (menbook.rows.length === 0 && womenbook.rows.length === 0) {
            return res.status(500).json({ message: 'Book not found' });
        }

        const updateBookStatus = await pool.query('UPDATE muslimahbooks SET status = $1 WHERE id = $2', ['available', book_id]);
        const updateBookStatus2 = await pool.query('UPDATE muslimeenbooks SET status = $1 WHERE id = $2', ['available', book_id]);

        
        
        const existinBorrwedTable = await pool.query('SELECT * FROM borrowedbooks WHERE book_id = $1 AND user_id = $2', [book_id, user_id]);
        if (existinBorrwedTable.rows.length === 0) {
            return res.status(500).json({ message: 'Book not borrowed' });
        }
        const returnedBook = await pool.query(
            'INSERT INTO returnedbooks (book_id, user_id, return_date) VALUES ($1, $2, $3) RETURNING *',
            [book_id, user_id, return_date]
            );
            
        const removeFromBorrowedTable = await pool.query('DELETE FROM borrowedbooks WHERE book_id = $1 AND user_id = $2', [book_id, user_id]);
        res.status(201).json(menbook.rows[0] || womenbook.rows[0]);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
}

export const displayBorrowedBooks = async (req, res) => {
    try {
        const user_id = req.query.user_id;
        const borrowedBooks = await pool.query('SELECT * FROM borrowedbooks WHERE user_id = $1', [user_id]);

        if (borrowedBooks.rows.length === 0) {
            return res.status(404).json({ message: 'No borrowed books found for this user' });
        }

        const borrowedBookDetails = [];

        for (const borrowedBook of borrowedBooks.rows) {
            const { book_id, start_date, end_date } = borrowedBook;

            const menbook = await pool.query('SELECT * FROM muslimahbooks WHERE id = $1 ', [book_id]);
            const womenbook = await pool.query('SELECT * FROM muslimeenbooks WHERE id = $1 ', [book_id]);

            if (menbook.rows.length === 0 && womenbook.rows.length === 0) {
                // Skip this borrowed book if the associated book is not found
                console.warn(`Book not found for book_id ${book_id}`);
                continue;
            }

            const bookInfo = {
                ...menbook.rows[0] || womenbook.rows[0],
                start_date,
                end_date
            };

            borrowedBookDetails.push(bookInfo);
        }

        res.json(borrowedBookDetails);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
}

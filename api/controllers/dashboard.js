import pool from '../db.js';

export const getAllBooks = async (req, res) => {
    try {
        const allBooks = await pool.query('SELECT * FROM muslimahbooks UNION SELECT * FROM muslimeenbooks');
        console.log(allBooks.rows);
        res.json(allBooks.rows);
    } catch (error) {
        console.error(error.message);
    }
}

export const getBook = async (req, res) => {
    try {
        const { category } = req.query;
        const query = `SELECT *
                       FROM muslimeenbooks
                       WHERE category = $1
                       UNION
                       SELECT *
                       FROM muslimahbooks
                       WHERE category = $1`
        const books = await pool.query(query, [category]);
        console.log(category);
        console.log(books.rows);
        res.json(books.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
};

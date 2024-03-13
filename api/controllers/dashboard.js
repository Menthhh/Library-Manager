import pool from '../db.js';

export const getAllBooks = async (req, res) => {
    try {
        const allBooks = await pool.query('SELECT * FROM muslimahbooks UNION SELECT * FROM muslimeenbooks');
        res.json(allBooks.rows);
    } catch (error) {
        console.error(error.message);
    }
}

export const getBook = async (req, res) => {
    try {
        const { category } = req.query;
        const { name } = req.query;
        if (category && name) {
            const books = await pool.query(`SELECT * FROM muslimeenbooks WHERE category = $1 AND name = $2 UNION SELECT * FROM muslimahbooks WHERE category = $1 AND name = $2`, [category, name]);
            res.json(books.rows);
        }
        else if (category) {
            const books = await pool.query(`SELECT * FROM muslimeenbooks WHERE category = $1 UNION SELECT * FROM muslimahbooks WHERE category = $1`, [category]);
            res.json(books.rows);
        }
        else if (name) {
            const books = await pool.query(`SELECT * FROM muslimeenbooks WHERE name LIKE $1 UNION SELECT * FROM muslimahbooks WHERE name LIKE $1`, [`%${name}%`]);
            res.json(books.rows);
        }
        else {
            //send all
            const books = await pool.query('SELECT * FROM muslimahbooks UNION SELECT * FROM muslimeenbooks');
            res.json(books.rows);
        }
           
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
};


export const getNumberOfBooks = async (req, res) => {
    try {

        const menBooksResult = await pool.query("SELECT COUNT(*) FROM muslimeenbooks WHERE status = 'available'");
        const womenBooksResult = await pool.query("SELECT COUNT(*) FROM muslimahbooks WHERE status = 'available'");

        const menBooksCount = menBooksResult.rows[0].count;
        const womenBooksCount = womenBooksResult.rows[0].count;

        res.json({
            menBooks: menBooksCount,
            womenBooks: womenBooksCount
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
};


export const getCategories = async (req, res) => {
    try {

        const menCategoriesResult = await pool.query(`SELECT DISTINCT category FROM muslimeenbooks`);
        const womenCategoriesResult = await pool.query(`SELECT DISTINCT   category FROM muslimahbooks`);


        const menCategories = menCategoriesResult.rows.map(row => row.category);
        const womenCategories = womenCategoriesResult.rows.map(row => row.category);


        res.json({
            menCategories: menCategories,
            womenCategories: womenCategories
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
};

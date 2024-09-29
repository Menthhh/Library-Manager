import pool from '../db.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";


export const register = async (req, res) => {
    const { email, username, phone_number, password } = req.body;

    try {

        const emailExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (emailExists.rows.length > 0) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const newUser = await pool.query(
            'INSERT INTO users (email, username, phone_number, password) VALUES ($1, $2, $3, $4) RETURNING *',
            [email, username, phone_number, password]
        );

        res.status(201).json(newUser.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
};


export const login = async (req, res, next) => {

    try {
        const user = req.body;
        const users = await pool.query('SELECT * FROM users WHERE email = $1', [user.email]);
        if (users.rows.length === 0) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        const isPassworCorrect = users.rows[0].password === user.password;
        if (!isPassworCorrect) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }


        dotenv.config();
        const token = jwt.sign({ id: users.rows[0].id }, process.env.SESSION_SECRET, { expiresIn: '1h' });
        const { password, ...others } = users.rows[0];
        res.cookie('token', token, { httpOnly: true }).status(200).json({ others });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
};
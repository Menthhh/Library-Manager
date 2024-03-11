import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
  password: process.env.POSTGRESQL_PASSWORD,
  host: "localhost",
  port: 8000,
  database: "MSC_Library"
});

export default pool;

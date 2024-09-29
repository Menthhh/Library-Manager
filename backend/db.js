import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
  password: process.env.POSTGRESQL_PASSWORD,
  host: "postgres",  // Use 'postgres' because that is the service name of the PostgreSQL container in Docker Compose
  port: 5432,
  database: "MSC_Library"
});


export default pool;

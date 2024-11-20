import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();


export const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});
db.getConnection()
  .then(() => {
    console.log("Connected to MySQL database!");
  })
  .catch((err) => {
    console.error("Unable to connect to MySQL:", err);
  });


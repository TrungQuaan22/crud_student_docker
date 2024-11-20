import express from 'express';
import dotenv from 'dotenv';
import mysql from 'mysql2';
import bodyParser from 'body-parser';
import cors from 'cors'; // Thêm dòng này
import router from './routes/studentRoutes';

dotenv.config(); // Load environment variables từ .env

const app = express();

// Cấu hình middleware
app.use(bodyParser.json());

// Cấu hình CORS
app.use(cors()); 

// Kết nối đến MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database!');
});

// Định nghĩa các routes cho API
app.use('/api/students', router); // Đảm bảo bạn đã tạo các route sinh viên

// Lắng nghe server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

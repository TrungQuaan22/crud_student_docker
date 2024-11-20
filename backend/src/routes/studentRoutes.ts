import express from 'express';
import { getAllStudents, addStudent, updateStudent, deleteStudent } from '../controllers/studentController';

const router = express.Router();

// API để lấy danh sách sinh viên
router.get('/', getAllStudents);

// API để thêm sinh viên mới
router.post('/', addStudent);

// API để sửa thông tin sinh viên
router.put('/:id', updateStudent);

// API để xóa sinh viên
router.delete('/:id', deleteStudent);

export default router;

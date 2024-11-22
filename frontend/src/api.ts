import axios from 'axios';

// URL của backend (đảm bảo backend đang chạy trên localhost:5000)
const api = axios.create({
  baseURL: 'http://localhost:8080/api/students',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Lấy danh sách sinh viên
export const getStudents = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
};

// Thêm sinh viên mới
export const addStudent = async (student: { name: string; age: number; email: string }) => {
  try {
    const response = await api.post('/', student);
    return response.data;
  } catch (error) {
    console.error('Error adding student:', error);
    throw error;
  }
};

// Cập nhật thông tin sinh viên
export const updateStudent = async (id: number, student: { name: string; age: number; email: string }) => {
  try {
    const response = await api.put(`/${id}`, student);
    return response.data;
  } catch (error) {
    console.error('Error updating student:', error);
    throw error;
  }
};

// Xóa sinh viên
export const deleteStudent = async (id: number) => {
  try {
    await api.delete(`/${id}`);
  } catch (error) {
    console.error('Error deleting student:', error);
    throw error;
  }
};

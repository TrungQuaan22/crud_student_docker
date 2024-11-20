import React, { useState, useEffect, useCallback } from 'react';
import StudentTable from './components/StudentTable';
import StudentForm from './components/StudentForm';
import { Student } from './models/Student';
import { Button } from 'react-bootstrap';
import { getStudents, addStudent, updateStudent, deleteStudent } from './api'; // Import API functions

const App: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isAdding, setIsAdding] = useState(false);


  const fetchStudents = useCallback(async () => {
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (error) {
      console.error('Error loading students:', error);
    }
  }, []);
  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);


  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    setIsAdding(false);
    setShowEditModal(true);
  };


  const handleAdd = () => {
    setEditingStudent(null);
    setIsAdding(true);
    setShowEditModal(true);
  };


  const handleSave = async (updatedStudent: Student) => {
    try {
      if (isAdding) {
        // Thêm sinh viên mới
        const newStudent = await addStudent(updatedStudent);
        setStudents((prevStudents) => [...prevStudents, newStudent]);
      } else {
        // Sửa sinh viên cũ
        const updated = await updateStudent(updatedStudent.id, updatedStudent);
        setStudents((prevStudents) =>
          prevStudents.map((student) =>
            student.id === updated.id ? updated : student
          )
        );
      }
      setShowEditModal(false);
      fetchStudents();
    } catch (error) {
      console.error('Error saving student:', error);
    }
  };

  // Xóa sinh viên
  const handleDelete = async (id: number) => {
    try {
      await deleteStudent(id);
      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <div className="App">
      <div className="container mt-4">
        <h2>Quản lý sinh viên</h2>
        <Button variant="primary" className="mb-3" onClick={handleAdd}>
          Thêm sinh viên
        </Button>
      </div>
      <StudentTable students={students} onEdit={handleEdit} onDelete={handleDelete} />
      <StudentForm
        show={showEditModal}
        student={editingStudent}
        onSave={handleSave}
        onClose={() => setShowEditModal(false)}
      />
    </div>
  );
};

export default App;

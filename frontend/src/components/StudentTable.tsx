import React, { useState } from 'react';
import { Student } from '../models/Student';
import { Modal, Button } from 'react-bootstrap';

interface StudentTableProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
}

const StudentTable: React.FC<StudentTableProps> = ({ students, onEdit, onDelete }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    setSelectedStudentId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (selectedStudentId !== null) {
      onDelete(selectedStudentId);
    }
    setShowDeleteModal(false);
  };

  return (
    <div className="container mt-4">
      <h2>Danh sách sinh viên</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Tuổi</th>
            <th>Email</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student,index) => (
            <tr key={student.id}>
              <td>{index+1}</td>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.email}</td>
              <td>
                <Button variant="warning" className="me-2" onClick={() => onEdit(student)}>
                  Sửa
                </Button>
                <Button variant="danger" onClick={() => handleDelete(student.id)}>
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal xác nhận xóa */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc chắn muốn xóa sinh viên này không?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Hủy
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default StudentTable;

import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Student } from '../models/Student';

interface StudentFormProps {
  show: boolean;
  student: Student | null; // null nếu thêm sinh viên mới
  onSave: (updatedStudent: Student) => void;
  onClose: () => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ show, student, onSave, onClose }) => {
  const [formData, setFormData] = useState<Student>({
    id: 0,
    name: '',
    age: 0,
    email: '',
  });

  useEffect(() => {
    if (student) {
      setFormData(student); // Load dữ liệu nếu sửa
    } else {
      // Reset form khi thêm mới
      setFormData({ id: 0, name: '', age: 0, email: '' });
    }
  }, [student]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{student ? 'Sửa thông tin sinh viên' : 'Thêm sinh viên mới'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter age"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Hủy
        </Button>
        <Button variant="primary" onClick={handleSave}>
          {student ? 'Lưu' : 'Thêm'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default StudentForm;

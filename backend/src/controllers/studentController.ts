import { Request, Response } from "express";
import { db } from "../config/db";
import { Student } from "../models/student";
import { RowDataPacket } from "mysql2";


export const getAllStudents = async (req: Request, res: Response) => {
    try {
        const [rows] = await db.query<RowDataPacket[]>("SELECT * FROM students");
        const students: Student[] = rows as Student[];
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: "Error fetching students" });
    }
};


export const addStudent = async (req: Request, res: Response) => {
    const { name, age, email } = req.body;
    try {
        const [result] = await db.query<RowDataPacket[]>(
            "INSERT INTO students (name, age, email) VALUES (?, ?, ?)",
            [name, age, email]
        );
        res.json({ message: "Student added", id: (result as any).insertId });
    } catch (error) {
        res.status(500).json({ error: "Error adding student" });
    }
};


export const updateStudent = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, age, email } = req.body;
    try {
        await db.query(
            "UPDATE students SET name = ?, age = ?, email = ? WHERE id = ?",
            [name, age, email, id]
        );
        res.json({ message: "Student updated" });
    } catch (error) {
        res.status(500).json({ error: "Error updating student" });
    }
};


export const deleteStudent = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await db.query("DELETE FROM students WHERE id = ?", [id]);
        res.json({ message: "Student deleted" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting student" });
    }
};


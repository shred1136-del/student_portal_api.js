import express from 'express';
import student from "./student.js";

const app = express();
const PORT = 1036;

//Middleware
app.use(express.json());
//
//CREATE STUDENT
// POST /students
//

app.post("/students", (req, res) => {
    const { name, regNumber, email } = req.body;

    //check if all required fields are provided
    if (!name || !regNumber || !email) {
        return res.status(400).json({
             error: "Name, registration number, and email are required." });
    }
//Generate a new ID
    const newStudent = {
        id: student.length + 1,
        name,
        regNumber,
        email
    };
    student.push(newStudent);
    res.status(201).json({
        message: "Student created successfully",
        student: newStudent
    });
})

//
//GET ALL STUDENTS
// GET /students/:id
//
app.get("/students/:id", (req, res) => {
    const id = Number(req.params.id);

    const foundStudent = student.find((stu) => stu.id === id);
    if (!foundStudent) {
        return res.status(404).json({
             error: "Student not found." });
     };
    res.status(200).json({ 
        student: foundStudent });
})

//
//UPDATE STUDENT
// PUT /students/:id
//
app.put("/students/:id", (req, res) => {
    const id = Number(req.params.id);
    const student = student.find((stu) => stu.id === id);
    if (!student) {
        return res.status(404).json({
             error: "Student not found."
             });
    }
const { name, regNumber, email } = req.body;
//Only name can be updated
if (regNumber || email) {
    return res.status(400).json({
         error: "Only student name can be updated." });
}
if (!name) {
    return res.status(400).json({
         error: "Name is required for update." });
}
student.name = name;
res.status(200).json({
    message: "Student updated successfully",
    student
});
});

//
//DELETE STUDENT
// DELETE /students/:id
//
app.delete("/students/:id", (req, res) => {
    const id = Number(req.params.id);
    const studentIndex = student.findIndex((stu) => stu.id === id);
    if (studentIndex === -1) {
        return res.status(404).json({
             error: "Student not found."
             });
    }
    student.splice(studentIndex, 1);
    res.status(200).json({
        message: "Student deleted successfully"
    });
});

//
// START SERVER
//
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

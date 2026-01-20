const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Employee = require("./models/Employee");

const app = express();

/* Middleware */
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

/* MongoDB */
mongoose
  .connect("mongodb://127.0.0.1:27017/employeeDB")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

/* ADD EMPLOYEE */
app.post("/api/employees", async (req, res) => {
  try {
    const last = await Employee.findOne().sort({ empId: -1 });
    const nextId = last ? last.empId + 1 : 1;

    const employee = new Employee({
      empId: nextId,
      name: req.body.name,
      email: req.body.email,
      department: req.body.department,
      salary: req.body.salary,
    });

    const saved = await employee.save();
    res.status(201).json(saved);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }
    res.status(500).json({ message: err.message });
  }
});

/* FETCH ACTIVE EMPLOYEES */
app.get("/api/employees/active", async (req, res) => {
  const employees = await Employee.find({ status: "ACTIVE" });
  res.json(employees);
});

/* FETCH EMPLOYEE BY ID (empId) */
app.get("/api/employees/by-id/:empId", async (req, res) => {
  const employee = await Employee.findOne({
    empId: Number(req.params.empId),
    status: "ACTIVE",
  });

  if (!employee) {
    return res.status(404).json({ message: "Employee not found" });
  }

  res.json(employee);
});

/* UPDATE EMPLOYEE */
app.put("/api/employees/:id", async (req, res) => {
  const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

/* SOFT DELETE (MARK INACTIVE) */
app.delete("/api/employees/:id", async (req, res) => {
  await Employee.findByIdAndUpdate(req.params.id, {
    status: "INACTIVE",
  });
  res.json({ message: "Employee marked INACTIVE" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

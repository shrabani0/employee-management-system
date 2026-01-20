const Employee = require("../models/Employee");

// Add Employee
exports.addEmployee = async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch Employee by ID
exports.getEmployeeById = async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  if (!employee) {
    return res.status(404).json({ message: "Employee not found" });
  }
  res.json(employee);
};

// Fetch All Active Employees
exports.getActiveEmployees = async (req, res) => {
  const employees = await Employee.find({ status: "ACTIVE" });
  res.json(employees);
};

// Update Employee
exports.updateEmployee = async (req, res) => {
  const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.json(employee);
};

// Soft Delete Employee
exports.deleteEmployee = async (req, res) => {
  const employee = await Employee.findByIdAndUpdate(
    req.params.id,
    { status: "INACTIVE" },
    { new: true },
  );
  res.json({ message: "Employee marked as INACTIVE", employee });
};

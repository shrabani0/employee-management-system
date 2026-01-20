const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  empId: { type: Number, unique: true },
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  department: { type: String, required: true },
  salary: { type: Number, required: true },
  status: {
    type: String,
    enum: ["ACTIVE", "INACTIVE"],
    default: "ACTIVE",
  },
});

module.exports = mongoose.model("Employee", employeeSchema);

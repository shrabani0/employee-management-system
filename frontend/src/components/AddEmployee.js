import { useState } from "react";
import { addEmployee } from "../services/employeeService";

function AddEmployee({ onEmployeeAdded }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    salary: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addEmployee(form);
      alert("Employee Added Successfully");
      setForm({ name: "", email: "", department: "", salary: "" });
      onEmployeeAdded();
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="card p-3 mb-4">
      <h4>Add Employee</h4>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <input type="text"
            className="form-control"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div className="col-md-6">
          <input type="email"
            className="form-control"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className="col-md-6">
          <input type="text"
            className="form-control"
            placeholder="Department"
            value={form.department}
            onChange={(e) => setForm({ ...form, department: e.target.value })}
          />
        </div>

        <div className="col-md-6">
          <input
            className="form-control"
            type="number"
            placeholder="Salary"
            value={form.salary}
            onChange={(e) => setForm({ ...form, salary: e.target.value })}
          />
        </div>

        <div className="col-12">
          <button className="btn btn-primary">Add Employee</button>
        </div>
      </form>
    </div>
  );
}

export default AddEmployee;

import { useEffect, useState } from "react";
import {
  getActiveEmployees,
  deleteEmployee,
  updateEmployee,
  getEmployeeByEmpId,
} from "../services/employeeService";
import AddEmployee from "./AddEmployee";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [editEmployee, setEditEmployee] = useState(null);
  const [searchId, setSearchId] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  // Load active employees
  const loadEmployees = async () => {
    const res = await getActiveEmployees();
    setEmployees(res.data);
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  // Delete (soft delete)
  const handleDelete = async (id) => {
    await deleteEmployee(id);
    loadEmployees();
  };

  // Search employee by ID
  const handleSearch = async () => {
    try {
      const res = await getEmployeeByEmpId(searchId);
      setSearchResult(res.data);
    } catch {
      alert("Employee not found");
      setSearchResult(null);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Employee Management System</h2>

      {/* ADD EMPLOYEE */}
      <AddEmployee onEmployeeAdded={loadEmployees} />

      {/* SEARCH */}
      <div className="card p-3 mb-4">
        <h4>Search Employee by ID</h4>
        <div className="d-flex gap-2">
          <input
            type="number"
            className="form-control"
            placeholder="Enter Employee ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <button className="btn btn-success" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      {/* SEARCH RESULT – FULL DETAILS */}
      {searchResult && (
        <div className="card p-3 mb-4">
          <h5>Employee Details</h5>
          <p>
            <b>ID:</b> {searchResult.empId}
          </p>
          <p>
            <b>Name:</b> {searchResult.name}
          </p>
          <p>
            <b>Email:</b> {searchResult.email}
          </p>
          <p>
            <b>Department:</b> {searchResult.department}
          </p>
          <p>
            <b>Salary:</b> {searchResult.salary}
          </p>
          <p>
            <b>Status:</b> {searchResult.status}
          </p>
        </div>
      )}

      {/* EDIT EMPLOYEE */}
      {editEmployee && (
        <div className="card p-3 mb-4">
          <h4>Edit Employee</h4>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              await updateEmployee(editEmployee._id, editEmployee);
              alert("Employee Updated Successfully");
              setEditEmployee(null);
              loadEmployees();
            }}
          >
            <div className="mb-2">
              <input 
                className="form-control"
                value={editEmployee.name}
                onChange={(e) =>
                  setEditEmployee({ ...editEmployee, name: e.target.value })
                }
                placeholder="Name"
              />
            </div>

            <div className="mb-2">
              <input
                className="form-control"
                value={editEmployee.department}
                onChange={(e) =>
                  setEditEmployee({
                    ...editEmployee,
                    department: e.target.value,
                  })
                }
                placeholder="Department"
              />
            </div>

            <div className="mb-2">
              <input
                type="number"
                className="form-control"
                value={editEmployee.salary}
                onChange={(e) =>
                  setEditEmployee({ ...editEmployee, salary: e.target.value })
                }
                placeholder="Salary"
              />
            </div>

            <button className="btn btn-primary me-2">Update</button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setEditEmployee(null)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* EMPLOYEE TABLE */}
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">
                No Active Employees
              </td>
            </tr>
          ) : (
            employees.map((emp) => (
              <tr key={emp._id}>
                <td>{emp.empId}</td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
                <td>{emp.salary}</td>
                <td>{emp.status}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => setEditEmployee(emp)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(emp._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;

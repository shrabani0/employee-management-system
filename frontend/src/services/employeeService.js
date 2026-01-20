import axios from "axios";

const API = "http://localhost:5000/api/employees";

export const addEmployee = (data) => axios.post(API, data);
export const getActiveEmployees = () => axios.get(`${API}/active`);
export const deleteEmployee = (id) => axios.delete(`${API}/${id}`);
export const updateEmployee = (id, data) => axios.put(`${API}/${id}`, data);
export const getEmployeeByEmpId = (empId) => axios.get(`${API}/by-id/${empId}`);

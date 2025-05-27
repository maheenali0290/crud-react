import axios from "axios";
import React, { useEffect, useState } from "react";

const Table = () => {
  const [userData, setUserData] = useState([]);
  const [editData, setEditData] = useState(null);

  const getAllUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/get-user");
      setUserData(res.data.user);
    } catch (error) {
      console.log(error.response?.data?.message || "Error fetching users");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleChange = (e) => {
    setEditData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/update-user/${editData._id}`,
        editData
      );
      alert("User updated successfully");
      setEditData(null); // Clear form
      getAllUsers(); // Refresh the list
    } catch (error) {
      console.log(error.response?.data?.message || "Update failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/delete-user/${id}`);
      alert("User deleted successfully");
      getAllUsers();
    } catch (error) {
      console.log(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div>
      <h1 align="center">All Users</h1>
      <center>
        <table
          border={2}
          cellPadding={10}
          style={{ borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th colSpan={2}>Action</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((val) => (
              <tr key={val._id}>
                <td>{val.fname}</td>
                <td>{val.email}</td>
                <td>{val.password}</td>
                <td>
                  <button onClick={() => setEditData(val)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(val._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {editData && (
          <>
            <br />
            <h3>Edit User</h3>
            <form onSubmit={(e) => e.preventDefault()}>
              <label>Name</label>
              <input
                type="text"
                name="fname"
                value={editData.fname}
                onChange={handleChange}
              />
              <label>Email</label>
              <input
                type="text"
                name="email"
                value={editData.email}
                onChange={handleChange}
              />
              <label>Password</label>
              <input
                type="text"
                name="password"
                value={editData.password}
                onChange={handleChange}
              />
              <br />
              <br />
              <button type="button" onClick={handleUpdate}>
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditData(null)}
                style={{ marginLeft: "10px" }}
              >
                Cancel
              </button>
            </form>
          </>
        )}
      </center>
    </div>
  );
};

export default Table;

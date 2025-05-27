import React, { useState } from "react";
import "../form.css";
import axios from "axios";
import Table from "./Table";

function SignupForm() {
  const [formData, setFormData] = useState({
    fname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Form Submitted:", formData);
      await axios.post("http://localhost:5000/api/create-user", formData);
      alert("User created successfully!");
      setFormData({ fname: "", email: "", password: "" }); // Reset form
    } catch (error) {
      console.log(error.response?.data?.message || "User creation failed");
      alert("Failed to create user.");
    }
  };

  return (
    <div>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fname">First Name:</label>
          <input
            type="text"
            id="fname"
            name="fname"
            value={formData.fname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>

      <br />
      <br />
    </div>
  );
}

export default SignupForm;

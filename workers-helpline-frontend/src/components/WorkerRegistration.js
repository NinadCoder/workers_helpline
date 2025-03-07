import React, { useState } from 'react';
import axios from 'axios';

const WorkerRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    skills: '',
    experience: '',
    location: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/worker/register', formData)
      .then(response => {
        alert('Registration successful! Your OTP is: ' + response.data.otp);
      })
      .catch(error => {
        console.error('Error during registration', error);
      });
  };

  return (
    <div className="container mt-5">
      <h2>Worker Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" className="form-control" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Skills:</label>
          <input type="text" name="skills" className="form-control" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Experience:</label>
          <input type="text" name="experience" className="form-control" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Location:</label>
          <input type="text" name="location" className="form-control" onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-success mt-3">Register</button>
      </form>
    </div>
  );
};

export default WorkerRegistration;

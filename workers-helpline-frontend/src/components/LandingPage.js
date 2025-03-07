import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => (
  <div className="container text-center mt-5">
    <h1>Welcome to Workers Helpline</h1>
    <p>Your one-stop platform for hiring skilled workers.</p>
    <Link to="/worker-register" className="btn btn-primary m-2">Worker Registration</Link>
    <Link to="/employer-dashboard" className="btn btn-secondary m-2">Employer Login</Link>
  </div>
);

export default LandingPage;

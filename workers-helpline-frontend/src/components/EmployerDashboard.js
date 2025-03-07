import React, { useState } from 'react';
import axios from 'axios';

const EmployerDashboard = () => {
  const [workers, setWorkers] = useState([]);
  const [searchParams, setSearchParams] = useState({
    location: '',
    skills: '',
    rating: ''
  });

  const handleSearch = () => {
    axios.get('http://localhost:5000/api/workers', { params: searchParams })
      .then(response => {
        setWorkers(response.data);
      })
      .catch(error => {
        console.error('Error fetching workers', error);
      });
  };

  return (
    <div className="container mt-5">
      <h2>Employer Dashboard</h2>
      <div className="form-inline mb-3">
        <input type="text" className="form-control mr-2" placeholder="Location" onChange={(e) => setSearchParams({ ...searchParams, location: e.target.value })} />
        <input type="text" className="form-control mr-2" placeholder="Skills" onChange={(e) => setSearchParams({ ...searchParams, skills: e.target.value })} />
        <input type="text" className="form-control mr-2" placeholder="Rating" onChange={(e) => setSearchParams({ ...searchParams, rating: e.target.value })} />
        <button className="btn btn-primary" onClick={handleSearch}>Search</button>
      </div>
      <div>
        {workers.map(worker => (
          <div key={worker._id} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">{worker.name}</h5>
              <p className="card-text">Skills: {worker.skills}</p>
              <p className="card-text">Experience: {worker.experience}</p>
              <p className="card-text">Location: {worker.location}</p>
              <p className="card-text">Rating: {worker.rating ? worker.rating : "Not rated yet"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployerDashboard;

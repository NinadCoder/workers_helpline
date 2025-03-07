import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobAlerts = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/job/alerts')
      .then(response => {
        setAlerts(response.data);
      })
      .catch(error => {
        console.error('Error fetching job alerts', error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2>Job Alerts & Notifications</h2>
      {alerts.length ? alerts.map((alert, index) => (
        <div key={index} className="alert alert-info">
          {alert.message}
        </div>
      )) : <p>No alerts at the moment.</p>}
    </div>
  );
};

export default JobAlerts;

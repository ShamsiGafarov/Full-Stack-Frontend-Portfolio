import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>
      <p style={{ color: '#666', marginBottom: '1rem' }}>
        Welcome back, {user?.username || user?.name}
      </p>
      <div className="dashboard-grid">
        <Link to="/admin/users" className="dashboard-card">
          <h3>Users</h3>
          <p>Manage user accounts</p>
        </Link>
        <Link to="/admin/projects" className="dashboard-card">
          <h3>Projects</h3>
          <p>Manage portfolio projects</p>
        </Link>
        <Link to="/admin/services" className="dashboard-card">
          <h3>Services</h3>
          <p>Manage services</p>
        </Link>
        <Link to="/admin/references" className="dashboard-card">
          <h3>References</h3>
          <p>Manage references</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
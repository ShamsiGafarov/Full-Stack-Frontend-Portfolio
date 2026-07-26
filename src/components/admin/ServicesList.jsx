import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { serviceAPI } from '../../services/api';

const ServicesList = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await serviceAPI.getAll();
      setServices(response.data);
    } catch (err) {
      setError('Failed to fetch services');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await serviceAPI.delete(id);
        setServices(services.filter(s => s._id !== id));
      } catch (err) {
        setError('Failed to delete service');
        console.error(err);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="list-container">
      <div className="list-header">
        <h2>Services</h2>
        <Link to="/admin/services/new" className="btn btn-primary">
          Add New Service
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service._id}>
              <td>{service.title}</td>
              <td>{service.description}</td>
              <td>
                <Link to={`/admin/services/edit/${service._id}`} className="btn btn-edit">
                  Edit
                </Link>
                <button onClick={() => handleDelete(service._id)} className="btn btn-delete">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServicesList;
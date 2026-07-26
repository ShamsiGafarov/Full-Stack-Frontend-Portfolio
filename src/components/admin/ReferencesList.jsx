import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { referenceAPI } from '../../services/api';

const ReferencesList = () => {
  const [references, setReferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReferences();
  }, []);

  const fetchReferences = async () => {
    try {
      setLoading(true);
      const response = await referenceAPI.getAll();
      setReferences(response.data);
    } catch (err) {
      setError('Failed to fetch references');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await referenceAPI.delete(id);
        setReferences(references.filter(r => r._id !== id));
      } catch (err) {
        setError('Failed to delete reference');
        console.error(err);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="list-container">
      <div className="list-header">
        <h2>References</h2>
        <Link to="/admin/references/new" className="btn btn-primary">
          Add New Reference
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Company</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {references.map((reference) => (
            <tr key={reference._id}>
              <td>{reference.name}</td>
              <td>{reference.position}</td>
              <td>{reference.company}</td>
              <td>
                <Link to={`/admin/references/edit/${reference._id}`} className="btn btn-edit">
                  Edit
                </Link>
                <button onClick={() => handleDelete(reference._id)} className="btn btn-delete">
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

export default ReferencesList;
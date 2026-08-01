import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projectAPI } from '../../services/api';

const ProjectsList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await projectAPI.getAll();
      setProjects(response.data);
    } catch (err) {
      setError('Failed to fetch projects');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectAPI.delete(id);
        setProjects(projects.filter(p => p._id !== id));
      } catch (err) {
        setError('Failed to delete project');
        console.error(err);
      }
    }
  };

  if (loading) return <div className="loading">Loading projects...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="list-container">
      <div className="list-header">
        <h2>Projects</h2>
        <Link to="/admin/projects/new" className="btn btn-primary">
          Add New Project
        </Link>
      </div>
      {projects.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666', padding: '2rem' }}>
          No projects found.
        </p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project._id}>
                <td>{project.title}</td>
                <td>{project.category}</td>
                <td>{new Date(project.createdAt).toLocaleDateString()}</td>
                <td>
                  <Link to={`/admin/projects/edit/${project._id}`} className="btn btn-edit">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(project._id)} className="btn btn-delete">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProjectsList;
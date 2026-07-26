import React, { useState, useEffect } from 'react';
import { projectAPI } from '../../services/api';

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await projectAPI.getAll();
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading projects...</div>;

  return (
    <div className="portfolio">
      <h1>My Portfolio</h1>
      <div className="projects-grid">
        {projects.map(project => (
          <div key={project._id} className="project-card">
            {project.imageUrl && <img src={project.imageUrl} alt={project.title} />}
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                View Live
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
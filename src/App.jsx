
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './components/public/Home';
import Portfolio from './components/public/Portfolio';
import Dashboard from './components/admin/Dashboard';
import UsersList from './components/admin/UsersList';
import UserForm from './components/admin/UserForm';
import ProjectsList from './components/admin/ProjectsList';
import ProjectForm from './components/admin/ProjectForm';
import ServicesList from './components/admin/ServicesList';
import ServiceForm from './components/admin/ServiceForm';
import ReferencesList from './components/admin/ReferencesList';
import ReferenceForm from './components/admin/ReferenceForm';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/users" element={<UsersList />} />
            <Route path="/admin/users/new" element={<UserForm />} />
            <Route path="/admin/users/edit/:id" element={<UserForm />} />
            <Route path="/admin/projects" element={<ProjectsList />} />
            <Route path="/admin/projects/new" element={<ProjectForm />} />
            <Route path="/admin/projects/edit/:id" element={<ProjectForm />} />
            <Route path="/admin/services" element={<ServicesList />} />
            <Route path="/admin/services/new" element={<ServiceForm />} />
            <Route path="/admin/services/edit/:id" element={<ServiceForm />} />
            <Route path="/admin/references" element={<ReferencesList />} />
            <Route path="/admin/references/new" element={<ReferenceForm />} />
            <Route path="/admin/references/edit/:id" element={<ReferenceForm />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

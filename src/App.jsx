import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './components/public/Home';
import Portfolio from './components/public/Portfolio';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Dashboard from './components/admin/Dashboard';
import UsersList from './components/admin/UsersList';
import UserForm from './components/admin/UserForm';
import ProjectsList from './components/admin/ProjectsList';
import ProjectForm from './components/admin/ProjectForm';
import ServicesList from './components/admin/ServicesList';
import ServiceForm from './components/admin/ServiceForm';
import ReferencesList from './components/admin/ReferencesList';
import ReferenceForm from './components/admin/ReferenceForm';
import './App.css';

// Wrapper component to handle auth redirects
const AppRoutes = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="loading-app">Loading...</div>;
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/portfolio" element={<Portfolio />} />
      
      {/* Auth Routes - Redirect if already logged in */}
      <Route path="/login" element={
        isAuthenticated ? <Navigate to="/admin" replace /> : <Login />
      } />
      <Route path="/register" element={
        isAuthenticated ? <Navigate to="/admin" replace /> : <Register />
      } />
      
      {/* Protected Admin Routes */}
      <Route path="/admin" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/admin/users" element={
        <ProtectedRoute>
          <UsersList />
        </ProtectedRoute>
      } />
      <Route path="/admin/users/new" element={
        <ProtectedRoute>
          <UserForm />
        </ProtectedRoute>
      } />
      <Route path="/admin/users/edit/:id" element={
        <ProtectedRoute>
          <UserForm />
        </ProtectedRoute>
      } />
      <Route path="/admin/projects" element={
        <ProtectedRoute>
          <ProjectsList />
        </ProtectedRoute>
      } />
      <Route path="/admin/projects/new" element={
        <ProtectedRoute>
          <ProjectForm />
        </ProtectedRoute>
      } />
      <Route path="/admin/projects/edit/:id" element={
        <ProtectedRoute>
          <ProjectForm />
        </ProtectedRoute>
      } />
      <Route path="/admin/services" element={
        <ProtectedRoute>
          <ServicesList />
        </ProtectedRoute>
      } />
      <Route path="/admin/services/new" element={
        <ProtectedRoute>
          <ServiceForm />
        </ProtectedRoute>
      } />
      <Route path="/admin/services/edit/:id" element={
        <ProtectedRoute>
          <ServiceForm />
        </ProtectedRoute>
      } />
      <Route path="/admin/references" element={
        <ProtectedRoute>
          <ReferencesList />
        </ProtectedRoute>
      } />
      <Route path="/admin/references/new" element={
        <ProtectedRoute>
          <ReferenceForm />
        </ProtectedRoute>
      } />
      <Route path="/admin/references/edit/:id" element={
        <ProtectedRoute>
          <ReferenceForm />
        </ProtectedRoute>
      } />
      
      {/* 404 - Redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProfileForm from './components/ProfileForm';
import ProfileDisplay from './components/ProfileDisplay';
import NotFound from './components/NotFound';

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/profile-form" element={<ProfileForm />} />
      <Route path="/profile" element={<ProfileDisplay />} />
      <Route path="/" element={<Navigate to="/profile-form" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default App;

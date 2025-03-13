// App.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './components/Login';  // our unified auth modal component
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Landing />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default App;

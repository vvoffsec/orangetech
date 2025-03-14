// App.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './components/Login';  // unified auth modal component
import Dashboard from './components/Dashboard';
import Pantry from './components/Pantry';
import AccountSettings from './components/AccountSettings';
import Recipes from './components/Recipes';
import MainLayout from './components/MainLayout';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Landing />} />
      <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pantry" element={<Pantry />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/settings" element={<AccountSettings />} />
        </Route>
    </Routes>
  );
};

export default App;

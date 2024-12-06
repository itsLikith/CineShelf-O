import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthPage } from '../../pages/AuthPage';

function UserAuthRoutes() {
  return (
    <Routes>
      <Route
        path="/user/login"
        element={<AuthPage role="user" task="login" />}
      />
    </Routes>
  );
}

export { UserAuthRoutes };

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserAuthRoutes } from './user.routes/user.auth.routes';

const AppRoutes = () => {
  return (
    <Router>
      <UserAuthRoutes />
    </Router>
  );
};

export { AppRoutes };

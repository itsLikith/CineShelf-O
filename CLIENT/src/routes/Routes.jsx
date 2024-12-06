import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserAuthRoutes } from './user.routes/user.auth.routes';
import { UserContentRoutes } from './user.routes/user.content.routes';

const AppRoutes = () => {
  return (
    <Router>
      <UserAuthRoutes />
      <UserContentRoutes />
    </Router>
  );
};

export { AppRoutes };

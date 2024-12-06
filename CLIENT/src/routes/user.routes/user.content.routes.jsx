import { Routes, Route } from 'react-router-dom';
import { UserHomePage } from '../../pages/UserHomePage';

const UserContentRoutes = () => {
  return (
    <Routes>
      <Route path="/user/home" element={<UserHomePage />} />
    </Routes>
  );
};

export { UserContentRoutes };

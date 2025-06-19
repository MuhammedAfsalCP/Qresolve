import { Routes, Route } from 'react-router-dom';
import { Login } from '../pages/auth/login';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="*" element={<div>404 - Page Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes;

import { Routes, Route } from 'react-router-dom';
import { Login } from '../pages/auth/Login';
import { Home } from '../pages/landing/Home';
import { Register_user } from '../pages/auth/Register_user';
import VerifyEmail from '../pages/auth/VerifyEmail';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/register" element={<Register_user />} />
            <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
    );
};

export default AppRoutes;

import { Routes, Route } from 'react-router-dom';

import { Register_user } from '../pages/auth/Register_user';
import VerifyEmail from '../pages/auth/VerifyEmail';
import { Login } from '../pages/auth/login'
import { HeroSection } from '../pages/landing/HeroSection';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HeroSection />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/register" element={<Register_user />} />
            <Route path="*" element={<div>404 - Page Not Found</div>} />
            {/* <Route path='/create-ticket' element={<CreateTickets/>}/> */}
        </Routes>
    );
};

export default AppRoutes;

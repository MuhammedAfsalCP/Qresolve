import { Routes, Route } from 'react-router-dom';
import { Login } from '../pages/auth/login';
import { Home } from '../pages/landing/Home';
import CreateTickets from '../pages/tickets/CreateTicket';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<div>404 - Page Not Found</div>} />
            <Route path='/create-ticket' element={<CreateTickets/>}/>
        </Routes>
    );
};

export default AppRoutes;

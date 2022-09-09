import { Outlet, Navigate } from 'react-router-dom';

export const ProtectedRoute = (loggedIn) => loggedIn ? <Outlet /> : <Navigate to='/' />;

export default ProtectedRoute;

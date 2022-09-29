import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ loggedIn }) => {
  if (loggedIn) {
    return <Outlet />;
  } return <Navigate to='/' />;
};

export default ProtectedRoute;

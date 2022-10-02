import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ loggedIn, children }) => {
  return (
    <>
      {localStorage.getItem('jwt') ? children
        : <Navigate to='/' />
      }
    </>
  );
};

export default ProtectedRoute;

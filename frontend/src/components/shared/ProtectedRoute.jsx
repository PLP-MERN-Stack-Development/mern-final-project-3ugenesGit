import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const ProtectedRoute = ({ roles }) => {
  const { user, token } = useSelector((state) => state.auth);
  if (!token) {
    return <Navigate to="/auth" replace />;
  }
  if (roles && !roles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};


import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hook/hook';

interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps): JSX.Element {
  const isAuth = useAppSelector((state) => state.store.isAuth); 

  return isAuth ? <>{children}</> : <Navigate to="/" />;
}

export default ProtectedRoute;

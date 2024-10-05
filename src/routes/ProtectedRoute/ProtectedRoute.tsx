import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { RootState } from '../../store/store';
import { Loader } from '../../components/UI/Loader/Loader';
import { AnonymousLayout } from '../../components/AnonymousLayout/AnonymousLayout';
import { useGetUserQuery } from '../../store/api/authApi';

export const ProtectedRoute = () => {
  const { isLoading } = useGetUserQuery(null, {
    refetchOnMountOrArgChange: true,
  });

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );  

  if (isLoading) {
    return (
      <AnonymousLayout>
        <Loader />
      </AnonymousLayout>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

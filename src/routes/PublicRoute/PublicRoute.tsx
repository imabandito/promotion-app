import { Outlet } from 'react-router-dom';
import { AnonymousLayout } from '../../components/AnonymousLayout/AnonymousLayout';

export const PublicRoute = () => {
    return (
      <AnonymousLayout>
        <Outlet />
      </AnonymousLayout>
    );
};

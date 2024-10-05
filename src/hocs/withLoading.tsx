import { ComponentType, ReactNode } from 'react';
import { Loader } from '../components/UI/Loader/Loader';

interface WithLoadingProps {
  isLoading: boolean;
  fallback?: ReactNode;
}

export const withLoading = <P extends object>(Component: ComponentType<P>) => {
  return ({
    isLoading,
    fallback = <Loader />,
    ...props
  }: WithLoadingProps & P) => {
    return isLoading ? fallback : <Component {...(props as P)} />;
  };
};

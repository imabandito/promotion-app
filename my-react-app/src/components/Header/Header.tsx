import { Search } from '../Search/Search';
import styles from './Header.module.scss';
import { User } from '../User/User';
import { withLoading } from '../../hocs/withLoading';
import { Loader } from '../UI/Loader/Loader';
import { useGetUserQuery } from '../../store/api/authApi';

export const Header = () => {
  const { isLoading } = useGetUserQuery(null);

  const UserWithLoader = withLoading(User);

  return (
    <header className={styles.header}>
      <Search extraClass={styles.headerSearch} />
      <UserWithLoader isLoading={isLoading} fallback={<Loader position="relative" />}/>
    </header>
  );
};

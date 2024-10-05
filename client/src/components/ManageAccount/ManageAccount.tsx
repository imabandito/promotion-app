import { EditAccountAvatar } from '../EditAccountAvatar/EditAccountAvatar';
import { EditAccountInfo } from '../EditAccountInfo/EditAccountInfo';
import { EditAccountPassword } from '../EditAccountPassword/EditAccountPassword';
import { Tabs } from '../Tabs/Tabs';
import styles from './ManageAccount.module.scss';
import { withLoading } from '../../hocs/withLoading';
import { useGetUserQuery } from '../../store/api/authApi';

const tabs = [
  {
    title: 'Edit Information',
    content: <EditAccountInfo />,
  },
  {
    title: 'User Avatar',
    content: <EditAccountAvatar />,
  },
  {
    title: 'Change Password',
    content: <EditAccountPassword />,
  },
];

export const ManageAccount = () => {
  const { isLoading } = useGetUserQuery(null);

  const TabsWithLoader = withLoading(Tabs);

  return (
    <div className={styles.manageAccount}>
      <h3 className={styles.manageAccountTitle}>Manage your account </h3>
      <TabsWithLoader tabs={tabs} isLoading={isLoading}/>
    </div>
  );
};

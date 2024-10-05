import { BasicLayout } from '../../components/BasicLayout/BasicLayout';
import styles from './Profile.module.scss';
import { ManageAccount } from '../../components/ManageAccount/ManageAccount';

export const Profile = () => {
  return (
    <BasicLayout extraClass={styles.container} align="center">
      <ManageAccount />
    </BasicLayout>
  );
};

import { BasicLayout } from '../../components/BasicLayout/BasicLayout';
import styles from './Dashboard.module.scss';
import { Widgets } from '../../components/Widgets/Widgets';
import { Articles } from '../../components/Articles/Articles';
import { DashboardHeader } from '../../components/DashboardHeader/DashboardHeader';

export const Dashboard = () => {
  return (
    <BasicLayout>
      <DashboardHeader />
      <div className={styles.dashboardContent}>
        <Articles />
        <Widgets />
      </div>
    </BasicLayout>
  );
};

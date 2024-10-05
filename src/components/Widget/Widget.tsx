import { ReactNode } from 'react';
import styles from './Widget.module.scss';

interface IWidgetProps {
  children: ReactNode;
  title?: string;
}

export const Widget = ({ children, title }: IWidgetProps) => {
  return (
    <div className={styles.widget}>
      <div className={styles.widgetHeader}>
        <p>{title}</p>
      </div>
      <div className={styles.widgetContent}>{children}</div>
    </div>
  );
};

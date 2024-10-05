import { ReactNode } from 'react';
import styles from './AnonymousLayout.module.scss';
import classNames from 'classnames';

interface IAnonymousLayoutProps {
  children?: ReactNode;
  extraClass?: string;
}

export const AnonymousLayout = ({
  children,
  extraClass,
}: IAnonymousLayoutProps) => {
  const classes = classNames(styles.container, extraClass);

  return (
    <main className={styles.main}>
      <div className={classes}>{children}</div>
    </main>
  );
};

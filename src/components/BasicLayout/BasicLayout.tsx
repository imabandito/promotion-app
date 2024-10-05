import { ReactNode } from 'react';
import styles from './BasicLayout.module.scss';
import { Header } from '../Header/Header';
import { LeftNavbar } from '../LeftNavbar/LeftNavbar';
import classNames from 'classnames';

interface IBasicLayoutProps {
  children?: ReactNode;
  extraClass?: string;
  size?: 'fluid' | 'm' | 'l';
  align?: 'center' | 'jb' | 'start' | 'je';
}

export const BasicLayout = ({
  children,
  extraClass,
  size = 'fluid',
  align = 'start',
}: IBasicLayoutProps) => {
  const classes = classNames(styles.container, extraClass, {
    [styles.containerMedium]: size === 'm',
    [styles.containerLarge]: size === 'l',
    [styles.containerFluid]: size === 'fluid',
    [styles.containerAlignCenter]: align === 'center',
    [styles.containerAlignStart]: align === 'start',
    [styles.containerAlignJB]: align === 'jb',
    [styles.containerAlignJE]: align === 'je',
  });

  return (
    <main className={styles.main}>
      <LeftNavbar />
      <div className={styles.content}>
        <Header />
        <div className={styles.wrapper}>
          <div className={classes}>{children}</div>
        </div>
      </div>
    </main>
  );
};

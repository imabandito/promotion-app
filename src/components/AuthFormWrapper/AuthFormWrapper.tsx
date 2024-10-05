import { ReactNode } from 'react';
import styles from './AuthFormWrapper.module.scss';

interface IAuthFormWrapperProps {
  children: ReactNode | ReactNode[];
  icon?: string;
  title?: string;
  subtitle?: string;
}

export const AuthFormWrapper = ({
  title,
  subtitle,
  children,
  icon,
}: IAuthFormWrapperProps) => {
  return (
    <div className={styles.authForm}>
      <div className={styles.authFormMainContent}>
        <div className={styles.authFormTitles}>
          {icon && (
            <img src={icon} alt="waving hand" className={styles.authFormIcon} />
          )}
          <h1>{title}</h1>
          <h6>{subtitle}</h6>
        </div>
        {children}
      </div>
    </div>
  );
};

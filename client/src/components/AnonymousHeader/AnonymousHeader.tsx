import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo-white.png';
import styles from './AnonymousHeader.module.scss';
import { Button } from '../UI/Button/Button';
import { ArrowLeftIcon } from '../../icons/ArrowLeftIcon';

interface IAnonymousHeaderProps {
  title: string;
}

export const AnonymousHeader = ({ title }: IAnonymousHeaderProps) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <Link to="/" className={styles.headerLogoWrapper}>
          <img src={logo} alt="logo" />
        </Link>
        <div className={styles.headerTitle}>
          <Button
            lookType="image"
            icon={<ArrowLeftIcon />}
            onClick={handleClick}
          />
          <h2>{title}</h2>
        </div>
      </div>
    </header>
  );
};

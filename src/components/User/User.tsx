import styles from './User.module.scss';
import arrow from '../../assets/arrow-down.svg';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import classNames from 'classnames';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import avatar from '../../assets/avatar.png';

export const User = () => {
  const [isOpen, setIsOpen] = useState(false);
  const classes = classNames(styles.user, { [styles.userOpen]: isOpen });
  const user = useSelector((state: RootState) => state.auth.user);
  const ref = useOutsideClick(() => setIsOpen(false));

  const handleProfileClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={classes} onClick={handleProfileClick} ref={ref}>
      <div className={styles.userAvatarWrapper}>
        <img
          src={user?.avatar || avatar}
          alt="avatar"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className={styles.userFullname}>
        {user?.name} {user?.lastName}
      </div>
      <img src={arrow} alt="arrow" />
      {isOpen && (
        <Link to="/profile" className={styles.userMenu}>
          Edit profile
        </Link>
      )}
    </div>
  );
};

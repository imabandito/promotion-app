import styles from './LeftNavbar.module.scss';
import logoDark from '../../assets/logo-blue.png';
import logoLight from '../../assets/logo-white.png';
import { Link, NavLink } from 'react-router-dom';
import { Divider } from '../UI/Divider/Divider';
import { DashdoardIcon } from '../../icons/DashdoardIcon';
import { Button } from '../UI/Button/Button';
import logoutIcon from '../../assets/logout.svg';
import { useContext, useState } from 'react';
import classNames from 'classnames';
import { useLogoutMutation } from '../../store/api/authApi';
import { ThemeContext } from '../../context/ThemeContext';
import { ThemeSwitch } from '../ThemeSwitch/ThemeSwitch';
import { Burger } from '../UI/Burger/Burger';

export const LeftNavbar = () => {
  const links = [
    {
      to: '/',
      name: 'Dashboard',
      icon: <DashdoardIcon />,
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const classes = classNames(styles.nav, isOpen && styles.navOpen);
  const [logout] = useLogoutMutation();

  const { themeName } = useContext(ThemeContext);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className={classes}>
      <Burger isOpen={isOpen} setIsOpen={setIsOpen} extraClass={styles.navBurger}/>
      <div className={styles.navContent}>
        <div>
          <Link className={styles.logoWrapper} to="/">
            <img
              src={themeName === 'light' ? logoDark : logoLight}
              alt="logo"
              className={styles.logo}
            />
          </Link>
          <p className={styles.navTitle}>Main Menu</p>
          <ul className={styles.navList}>
            {links.map(({ to, name, icon }) => (
              <li key={name}>
                <NavLink
                  onClick={() => setIsOpen(false)}
                  to={to}
                  className={({ isActive }) =>
                    [styles.navLink, isActive ? styles.navLinkActive : ''].join(
                      ' '
                    )
                  }
                >
                  {icon}
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
          <Divider color="lightgrey" extraClass={styles.navDivider} />
          <Button
            lookType="combine"
            icon={logoutIcon}
            color="grey"
            extraClass={styles.navLogout}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
        <div className={styles.navThemeWrapper}>
          <ThemeSwitch />
        </div>
      </div>
    </nav>
  );
};

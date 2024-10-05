import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import styles from './ThemeSwitch.module.scss';
import { SunIcon } from '../../icons/SunIcon';
import { MoonIcon } from '../../icons/MoonIcon';
import classNames from 'classnames';

export const ThemeSwitch = () => {
  const { themeName, toggleTheme } = useContext(ThemeContext);
  const activeClasses = classNames(
    styles.switchActive,
    themeName === 'light' ? styles.switchActiveLeft : styles.switchActiveRight
  );

  const handleClick = () => {
    toggleTheme();
  };

  return (
    <button className={styles.switch} onClick={handleClick}>
      <SunIcon />
      <MoonIcon />
      <div className={activeClasses}></div>
    </button>
  );
};

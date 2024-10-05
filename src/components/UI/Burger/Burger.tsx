import classNames from 'classnames';
import styles from './Burger.module.scss';

interface IBurgerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  extraClass?: string;
}

export const Burger = ({ isOpen, setIsOpen, extraClass }: IBurgerProps) => {
  const classes = classNames(
    styles.burger,
    extraClass,
    isOpen && styles.burgerOpen
  );
  const wrapperClasses = classNames(
    styles.burgerWrapper,
    isOpen && styles.burgerWrapperOpen
  );

  return (
    <div className={wrapperClasses}>
      <div className={classes} onClick={() => setIsOpen(!isOpen)}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

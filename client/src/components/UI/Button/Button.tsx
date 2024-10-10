import React, { ReactNode } from 'react';
import styles from './Button.module.scss';
import classNames from 'classnames';

interface IButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  extraClass?: string;
  lookType?: 'text' | 'image' | 'combine';
  iconName?: string;
  icon?: string | ReactNode;
  weight?: 'default' | 'light';
  color?: 'default' | 'white' | 'grey';
  size?: 'fluid' | 'fit';
}

export const Button: React.FC<IButtonProps> = ({
  extraClass,
  lookType = 'text',
  iconName,
  icon,
  weight = 'default',
  color = 'default',
  size = 'fluid',
  children,
  ...rest
}) => {
  const generalClasses = classNames(
    styles[`button${weight}`],
    styles[`button${color}`],
    styles[`button${size}`],
    extraClass
  );

  const classes = classNames(styles.button, generalClasses);
  const classesImage = classNames(extraClass, styles.buttonImage);
  const classesCombine = classNames(styles.buttonCombine, generalClasses);

  return (
    <>
      {lookType === 'text' && (
        <button {...rest} className={classes}>
          {children}
        </button>
      )}
      {lookType === 'image' && (
        <button className={classesImage} {...rest}>
          {typeof icon === 'string' ? <img src={icon} alt={iconName} /> : icon}
        </button>
      )}
      {lookType === 'combine' && (
        <button className={classesCombine} {...rest}>
          {typeof icon === 'string' ? <img src={icon} alt={iconName} /> : icon}
          {children}
        </button>
      )}
    </>
  );
};

import React from 'react';
import styles from './CheckBox.module.scss';
import { UseFormRegisterReturn } from 'react-hook-form';
import classNames from 'classnames';
import check from '../../../assets/check.svg';

interface ICheckBoxProps extends React.ComponentPropsWithoutRef<'input'> {
  register: UseFormRegisterReturn;
  extraClass?: string;
}

export const CheckBox = ({ register, extraClass, ...rest }: ICheckBoxProps) => {
  const classes = classNames(styles.checkboxContainer, extraClass);

  return (
    <label className={classes}>
      <input type="checkbox" {...rest} {...register} />
      <span className={styles.checkboxCheckmark}>
        <img src={check} alt="check" className={styles.checkboxIcon} />
      </span>
    </label>
  );
};

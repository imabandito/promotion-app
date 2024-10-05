import React from 'react';
import styles from './TextInput.module.scss';
import classNames from 'classnames';
import { UseFormRegisterReturn } from 'react-hook-form';

interface ITextInputProps extends React.ComponentPropsWithoutRef<'input'> {
  title: string;
  extraClass?: string;
  hint?: string;
  register?: UseFormRegisterReturn;
  error?: string | boolean;
}

export const TextInput = ({
  title,
  extraClass,
  hint,
  register,
  error,
  ...rest
}: ITextInputProps) => {
  const classes = classNames(styles.textInput, extraClass, {
    [styles.textInputError]: error,
  });

  return (
    <div className={classes}>
      <label htmlFor={title}>{title}</label>
      <input type="text" id={title} {...rest} {...register} />
      <div className={styles.textInputErrorText}>
        {hint && <span className={styles.textInputHint}>{hint}</span>}
        {error}
      </div>
    </div>
  );
};

export default TextInput;

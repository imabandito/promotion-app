import React from 'react';
import styles from './TextArea.module.scss';
import classNames from 'classnames';
import { UseFormRegisterReturn } from 'react-hook-form';

interface ITextAreaProps extends React.ComponentPropsWithoutRef<'textarea'> {
  title?: string;
  extraClass?: string;
  hint?: string;
  register?: UseFormRegisterReturn;
  error?: string | boolean;
}

export const TextArea = ({
  title,
  extraClass,
  hint,
  register,
  error,
  ...rest
}: ITextAreaProps) => {
  const classes = classNames(styles.TextArea, extraClass, {
    [styles.TextAreaError]: error,
  });

  return (
    <div className={classes}>
      <label htmlFor={title}>{title}</label>
      <textarea id={title} {...rest} {...register} />
      <div className={styles.TextAreaErrorText}>
        {hint && <span className={styles.TextAreaHint}>{hint}</span>}
        {error}
      </div>
    </div>
  );
};

export default TextArea;

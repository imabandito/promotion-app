import styles from './Divider.module.scss';
import classNames from 'classnames';

interface IDividerProps {
  text?: string;
  extraClass?: string;
  color?: 'grey' | 'lightgrey';
}

export const Divider = ({
  text,
  extraClass,
  color = 'grey',
}: IDividerProps) => {
  const classes = classNames(
    styles.divider,
    extraClass,
    color === 'grey' ? '' : styles.dividerLightGrey
  );

  return (
    <div className={classes}>
      <span className={styles.dividerLine}></span>
      {text && <span className={styles.dividerText}>{text}</span>}
      {text && <span className={styles.dividerLine}></span>}
    </div>
  );
};

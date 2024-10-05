import { Link, LinkProps } from 'react-router-dom';
import styles from './SimpleLink.module.scss';
import classNames from 'classnames';

interface ISimpleLinkProps extends LinkProps {
  text: string;
  extraClass?: string;
}

export const SimpleLink = ({
  text,
  to,
  extraClass,
  ...rest
}: ISimpleLinkProps) => {
  const classes = classNames(styles.link, extraClass);

  return (
    <Link className={classes} to={to} {...rest}>
      {text}
    </Link>
  );
};

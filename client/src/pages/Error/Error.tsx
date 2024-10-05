import { Link } from 'react-router-dom';
import styles from './Error.module.scss';

export const Error = () => (
  <div className={styles.errorWrapper}>
    <div className={styles.errorTitle}>Error &#x1F62D;</div>
    <Link to="/" className={styles.errorLink}>
      Go to main page
    </Link>
  </div>
);

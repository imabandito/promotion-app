import google from '../../assets/google.svg';
import { Button } from '../UI/Button/Button';
import { Divider } from '../UI/Divider/Divider';
import styles from './AuthSocials.module.scss';

interface IAuthSocialsProps {
  type: 'login' | 'signup';
}

export const AuthSocials = ({ type }: IAuthSocialsProps) => {
  const caption =
    type === 'login' ? 'Or do it via other accounts' : 'Or sign up with';
  const onAuthGoogle = async () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  return (
    <div className={styles.socialsAuth}>
      <Divider text={caption} extraClass={styles.socialsAuthDivider} />
      <div className={styles.socialsAuthSocials}>
        <Button onClick={onAuthGoogle} lookType="image" icon={google}></Button>
      </div>
    </div>
  );
};

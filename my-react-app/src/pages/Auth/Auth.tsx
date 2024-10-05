import styles from './Auth.module.scss';
import loginBg from '../../assets/login-background.png';
import signupBg from '../../assets/signup-background.png';
import forgotBg from '../../assets/forgot-background.png';
import { Login } from '../../components/Login/Login';
import { SignUp } from '../../components/SignUp/SignUp';
import { PasswordRecovery } from '../../components/PasswordRecovery/PasswordRecovery';
import { withLoading } from '../../hocs/withLoading';
import { useGetUserQuery } from '../../store/api/authApi';
import { ThemeSwitch } from '../../components/ThemeSwitch/ThemeSwitch';
import { Loader } from '../../components/UI/Loader/Loader';

const authOptions = {
  login: {
    component: Login,
    image: loginBg,
  },
  signup: {
    component: SignUp,
    image: signupBg,
  },
  forgot: {
    component: PasswordRecovery,
    image: forgotBg,
  },
};

interface IAuthProps {
  authType?: keyof typeof authOptions;
}

export const Auth = ({ authType = 'login' }: IAuthProps) => {
  const { isLoading } = useGetUserQuery(null);

  const { component, image } = authOptions[authType];
  const AuthFormWithLoading = withLoading(component);

  return (
    <section className={styles.auth}>
      <div className={styles.authImageWrapper}>
        <img src={image} alt="auth" className={styles.authImage} />
      </div>
      <div className={styles.authRight}>
        <AuthFormWithLoading
          fallback={<Loader position="relative" />}
          isLoading={isLoading}
        />
      </div>
      <div className={styles.authThemeSwitch}>
        <ThemeSwitch />
      </div>
    </section>
  );
};

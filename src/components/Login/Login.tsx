import styles from './Login.module.scss';
import handImg from '../../assets/waving-hand.png';
import { TextInput } from '../UI/TextInput/TextInput';
import { SimpleLink } from '../UI/SimpleLink/SimpleLink';
import { Button } from '../UI/Button/Button';
import { useForm } from 'react-hook-form';
import { AuthSocials } from '../AuthSocials/AuthSocials';
import { useLoginMutation } from '../../store/api/authApi';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { emailRegex } from '../../configs/constants';

export interface ILoginFormValues {
  email: string;
  password: string;
}

export const Login = () => {
  const { register, handleSubmit, formState, watch } =
    useForm<ILoginFormValues>({ mode: 'onChange' });
  const { errors, dirtyFields, isValid } = formState;
  const formValues = watch();

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const [login] = useLoginMutation();

  const onSubmit = async () => {
    await login(formValues);
  };

  return isAuthenticated ? (
    <Navigate to="/" />
  ) : (
    <div className={styles.login}>
      <div className={styles.loginMainContent}>
        <img src={handImg} alt="waving hand" className={styles.loginHand} />
        <h1>Welcome back</h1>
        <h6>Sign in to manage your account.</h6>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            title="Email Address"
            placeholder="Enter your email address"
            extraClass={styles.loginEmail}
            register={{
              ...register('email', {
                required: 'Email is required',
                pattern: {
                  value:
                    emailRegex,
                  message: 'Invalid email address',
                },
              }),
            }}
            error={dirtyFields.email && errors.email?.message}
          />
          <TextInput
            title="Password"
            placeholder="Enter your password"
            type="password"
            extraClass={styles.loginPassword}
            register={{
              ...register('password', { required: 'Password is required' }),
            }}
            error={dirtyFields.password && errors.password?.message}
          />
          <SimpleLink
            text="Forgot your password?"
            to="/forgot"
            extraClass={styles.loginForgot}
          />
          <Button
            extraClass={styles.loginButton}
            disabled={!isValid}
            type="submit"
          >
            Sign in
          </Button>
        </form>
        <AuthSocials type="login" />
      </div>
      <div className={styles.loginLow}>
        <span>Don’t have an account? </span>
        <SimpleLink text="Sign Up" to="/signup" />
      </div>
    </div>
  );
};

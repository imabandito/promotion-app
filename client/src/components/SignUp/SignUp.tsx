import styles from './SignUp.module.scss';
import { Button } from '../UI/Button/Button';
import { SimpleLink } from '../UI/SimpleLink/SimpleLink';
import TextInput from '../UI/TextInput/TextInput';
import { CheckBox } from '../UI/CheckBox/CheckBox';
import { useForm } from 'react-hook-form';
import { AuthSocials } from '../AuthSocials/AuthSocials';
import { useSignupMutation } from '../../store/api/authApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Navigate } from 'react-router-dom';
import { emailRegex } from '../../configs/constants';
import { AuthFormWrapper } from '../AuthFormWrapper/AuthFormWrapper';

export interface ISignUpFormValues {
  name: string;
  age: number;
  email: string;
  password: string;
  passwordRepeat: string;
  terms: boolean;
}

export const SignUp = () => {
  const [signup] = useSignupMutation();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const { register, handleSubmit, formState, watch, trigger } =
    useForm<ISignUpFormValues>({
      mode: 'onBlur',
    });
  const { dirtyFields, errors, isValid } = formState;

  const onSubmit = async (data: ISignUpFormValues) => {
    try {
      await signup(data).unwrap();
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return isAuthenticated ? (
    <Navigate to="/" />
  ) : (
    <AuthFormWrapper
      title="Get started today"
      subtitle="Enter your details to create super account."
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.signupGeneral}>
          <TextInput
            title="Name"
            placeholder="Enter your name"
            register={{
              ...register('name', {
                required: 'Name is required',
                minLength: 2,
              }),
            }}
            error={dirtyFields.name && errors.name?.message}
          />
          <TextInput
            title="Age"
            placeholder="Enter your age"
            type="number"
            register={{
              ...register('age', {
                required: 'Age is required',
                valueAsNumber: true,
              }),
            }}
            error={dirtyFields.age && errors.age?.message}
          />
        </div>
        <TextInput
          title="Email Address"
          placeholder="Enter your email address"
          extraClass={styles.signupEmail}
          register={{
            ...register('email', {
              required: 'Email is required',
              pattern: {
                value: emailRegex,
                message: 'Invalid email address',
              },
            }),
          }}
          error={dirtyFields.email && errors.email?.message}
        />
        <TextInput
          title="Password"
          placeholder="Enter your password"
          extraClass={styles.signupPassword}
          hint="Must be 8 characters long at least"
          type="password"
          autoComplete="on"
          register={register('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters long',
            },
            onChange: () => trigger('password'),
          })}
          error={dirtyFields.password && errors.password?.message}
        />
        <TextInput
          title="Confirm New Password"
          placeholder="Enter your new password again"
          extraClass={styles.signupPasswordConfirm}
          type="password"
          register={register('passwordRepeat', {
            required: 'Confirm Password is required',
            validate: (value) =>
              value === watch('password') || 'Passwords should match',
            onChange: () => trigger('passwordRepeat'),
          })}
          error={dirtyFields.passwordRepeat && errors.passwordRepeat?.message}
        />
        <div className={styles.signupAgree}>
          <CheckBox
            register={{
              ...register('terms', {
                required: 'You must agree to the terms and policy',
              }),
            }}
          />
          <div>
            <label htmlFor="terms">I agree to Product</label>
            <SimpleLink text=" Terms and Policy." to="/terms" />
          </div>
        </div>
        <Button extraClass={styles.signupButton} disabled={!isValid}>
          Get started now
        </Button>
      </form>
      <AuthSocials type="signup" />
      <div className={styles.signupLow}>
        <span>Already have an account? </span>
        <SimpleLink text="Login" to="/login" />
      </div>
    </AuthFormWrapper>
  );
};

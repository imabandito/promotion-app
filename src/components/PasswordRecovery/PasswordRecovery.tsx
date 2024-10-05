import styles from './PasswordRecovery.module.scss';
import { Button } from '../UI/Button/Button';
import { SimpleLink } from '../UI/SimpleLink/SimpleLink';
import TextInput from '../UI/TextInput/TextInput';
import { useForm } from 'react-hook-form';
import { emailRegex } from '../../configs/constants';

export interface IRecoveryFormValues {
  email: string;
}

export const PasswordRecovery = () => {
  const onSubmit = (data: IRecoveryFormValues) => {
    console.log('reset click', data);
  };

  const {
    register,
    handleSubmit,
    formState: { dirtyFields, errors, isValid },
  } = useForm<IRecoveryFormValues>({
    mode: 'onBlur',
  });

  return (
    <div className={styles.forgot}>
      <div className={styles.forgotMainContent}>
        <h1>Password recovery</h1>
        <h6>Enter the email you're using for your account.</h6>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            title="Email Address"
            placeholder="Enter your email address"
            extraClass={styles.forgotEmail}
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
          <Button extraClass={styles.forgotButton} disabled={!isValid}>
            Reset
          </Button>
        </form>
        <SimpleLink
          text="Back to Login"
          to="/login"
          extraClass={styles.forgotLogin}
        />
      </div>
    </div>
  );
};

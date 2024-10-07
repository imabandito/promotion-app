import styles from './EditAccountPassword.module.scss';
import { useForm } from 'react-hook-form';
import TextInput from '../UI/TextInput/TextInput';
import { Button } from '../UI/Button/Button';
import { useResetPasswordMutation } from '../../store/api/authApi';
import { useNavigate } from 'react-router-dom';

interface IEditAccountPasswordFormValues {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const EditAccountPassword = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState, watch, trigger, reset, setError } =
    useForm<IEditAccountPasswordFormValues>({
      mode: 'onBlur',
    });
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const onSubmit = async (data: IEditAccountPasswordFormValues) => {
    try {
      await resetPassword(data).unwrap();
      reset();
    } catch (error) {
      setError('root.serverError', {});
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const { dirtyFields, errors, isValid } = formState;
  return (
    <div className={styles.accountPassword}>
      <h4>Change your password</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          title="Old Password"
          placeholder="Enter your current password"
          extraClass={styles.accountPasswordTitle}
          type="password"
          autoComplete="password"
          register={{
            ...register('oldPassword', {
              required: 'Old Password is required',
              minLength: 1,
            }),
          }}
          error={dirtyFields.oldPassword && errors.oldPassword?.message}
        />
        <TextInput
          title="New Password"
          placeholder="Enter your new password"
          extraClass={styles.accountPasswordTitle}
          type="password"
          autoComplete="new-password"
          register={{
            ...register('newPassword', {
              required: 'New Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters long',
              },
            }),
          }}
          error={dirtyFields.newPassword && errors.newPassword?.message}
        />
        <TextInput
          title="Confirm New Password"
          placeholder="Enter your new password again"
          extraClass={styles.signupPasswordConfirm}
          type="password"
          autoComplete="new-password"
          register={register('confirmPassword', {
            required: 'Confirm Password is required',
            validate: (value) =>
              value === watch('newPassword') || 'Passwords should match',
            onChange: () => trigger('confirmPassword'),
          })}
          error={dirtyFields.confirmPassword && errors.confirmPassword?.message}
        />

        <div className={styles.accountPasswordButtons}>
          <Button
            color="white"
            weight="light"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button weight="light" disabled={!isValid || isLoading}>
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

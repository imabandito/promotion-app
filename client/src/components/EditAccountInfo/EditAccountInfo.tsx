import styles from './EditAccountInfo.module.scss';
import { useForm } from 'react-hook-form';
import TextInput from '../UI/TextInput/TextInput';
import { Button } from '../UI/Button/Button';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { useUpdateUserInfoMutation } from '../../store/api/authApi';
import { useNavigate } from 'react-router-dom';

interface IEditAccountInfoFormValues {
  name: string;
  lastName: string;
  age: number;
}

export const EditAccountInfo = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState } =
    useForm<IEditAccountInfoFormValues>({
      mode: 'onBlur',
    });
  const { dirtyFields, errors, isValid, isDirty } = formState;

  const user = useSelector((state: RootState) => state.auth.user);
  const [editInfo, { isLoading }] = useUpdateUserInfoMutation();

  const onSubmit = async (data: IEditAccountInfoFormValues) => {
    await editInfo(data);
  };

  const onCancel = () => {
    navigate(-1);
  };

  return (
    <div className={styles.accountInfo}>
      <h4 className={styles.accountInfoTitle}>Change your information</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          title="First Name"
          placeholder="Enter your first name"
          extraClass={styles.articleActionTitle}
          defaultValue={user?.name}
          register={{
            ...register('name', {
              required: 'First Name is required',
              minLength: 1,
            }),
          }}
          error={dirtyFields.name && errors.name?.message}
        />
        <TextInput
          title="Last Name"
          placeholder="Enter your last name"
          extraClass={styles.articleActionTitle}
          defaultValue={user?.lastName}
          register={{
            ...register('lastName', {
              required: false,
              minLength: 1,
            }),
          }}
          error={dirtyFields.lastName && errors.lastName?.message}
        />
        <TextInput
          title="Age"
          placeholder="Enter your age"
          type="number"
          defaultValue={user?.age}
          register={{
            ...register('age', {
              required: false,
              valueAsNumber: true,
            }),
          }}
          error={dirtyFields.age && errors.age?.message}
        />

        <div className={styles.accountInfoButtons}>
          <Button color="white" weight="light" onClick={onCancel} type="button">
            Cancel
          </Button>
          <Button
            weight="light"
            disabled={!isValid || !isDirty || isLoading}
            type="submit"
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

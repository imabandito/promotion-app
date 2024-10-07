import styles from './EditAccountAvatar.module.scss';
import { Button } from '../UI/Button/Button';
import { FilePicker } from '../FilePicker/FilePicker';
import { useState } from 'react';
import { useUploadAvatarMutation } from '../../store/api/authApi';
import { useNavigate } from 'react-router-dom';

export const EditAccountAvatar = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const onFilesDrop = (files: File[]) => {
    setFile(files[0]);
  };
  const [uploadAvatar, { isLoading }] = useUploadAvatarMutation();

  const handleUpload = async () => {
    const formData = new FormData();
    file && formData.append('avatar', file);

    await uploadAvatar(formData);
    setFile(null);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className={styles.accountAvatar}>
      <FilePicker
        dropHandler={onFilesDrop}
        allowedTypes={['.jpg', '.png']}
        title="Add cover photo"
        file={file}
      />
      <div className={styles.accountAvatarButtons}>
        <Button color="white" weight="light" onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          weight="light"
          onClick={handleUpload}
          disabled={!file || isLoading}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

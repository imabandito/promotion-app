import { useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './FilePicker.module.scss';
import uploadIcon from '../../assets/upload.svg';
import { UseFormRegisterReturn } from 'react-hook-form';

interface IFilePickerProps {
  dropHandler: (files: File[]) => void;
  allowedTypes?: string[];
  extraClass?: string;
  title?: string;
  register?: UseFormRegisterReturn;
  file?: File | null;
}

const imageTypes = ['jpg', 'jpeg', 'png'];

export const FilePicker = ({
  extraClass,
  dropHandler,
  allowedTypes = [],
  title,
  register,
  file = null,
}: IFilePickerProps) => {
  const [image, setImage] = useState('');
  const [fileName, setFileName] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const classes = classNames(
    styles.filePicker,
    isDragOver && styles.filePickerOver,
    extraClass
  );

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);

    const ext = files[0].name.split('.').pop() || '';

    if (imageTypes.includes(ext)) {
      setImage(URL.createObjectURL(files[0]));
    } else {
      setFileName(files[0].name);
    }
    dropHandler(fileArray);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(event.target.files);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    setIsDragOver(false);
    event.preventDefault();
    handleFiles(event.dataTransfer.files);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={styles.filePickerWrapper}>
      <h4>{title}</h4>
      <p className={styles.filePickerSubTitle}>Drag and drop file below</p>
      <div
        className={classes}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
      >
        <img src={uploadIcon} alt="upload" className={styles.filePickerIcon} />
        <p className={styles.filePickerTypes}>
          {allowedTypes.map((type) => type.toUpperCase()).join(' ')}
        </p>
        <input
          type="file"
          accept={`${allowedTypes.join(', ')}`}
          ref={fileInputRef}
          onChange={handleChange}
          className={styles.filePickerInput}
          {...register}
        />
        <div className={styles.filePickerContent}>
          <p className={styles.filePickerAlso}>You can also upload files by</p>
          <p className={styles.filePickerClick} onClick={openFileDialog}>
            clicking here
          </p>
        </div>
      </div>
      {file && image && (
        <img src={image} alt="preview" className={styles.filePickerPreview} />
      )}
      {file && fileName && (
        <p className={styles.filePickerSubTitle}>{fileName}</p>
      )}
    </div>
  );
};

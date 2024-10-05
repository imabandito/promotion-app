import { AnonymousLayout } from '../../components/AnonymousLayout/AnonymousLayout';
import { AnonymousHeader } from '../../components/AnonymousHeader/AnonymousHeader';
import { InfoParagraph } from '../../components/InfoParagraph/InfoParagraph';
import data from './termsData';
import styles from './Terms.module.scss';
import { Button } from '../../components/UI/Button/Button';
import { useNavigate } from 'react-router-dom';

export const Terms = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
  };

  return (
    <AnonymousLayout>
      <AnonymousHeader title="Product legal information" />
      <div className={styles.container}>
        <h1>Privacy Policy</h1>
        {data.map((info, i) => (
          <InfoParagraph info={info} key={i} />
        ))}
        <Button color="white" weight="light" onClick={handleClick} size="fit">
          Back
        </Button>
      </div>
    </AnonymousLayout>
  );
};

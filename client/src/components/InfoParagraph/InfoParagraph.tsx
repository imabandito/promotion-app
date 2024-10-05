import styles from './InfoParagraph.module.scss';

interface IInfoParagraphProps {
  info: {
    title: string;
    paragraphs: string[];
  };
}

export const InfoParagraph = ({
  info: { title, paragraphs },
}: IInfoParagraphProps) => {
  return (
    <div className={styles.info}>
      <h3>{title}</h3>
      {paragraphs.map((text, i) => (
        <p key={i}>
          {text}
          <br />
        </p>
      ))}
    </div>
  );
};

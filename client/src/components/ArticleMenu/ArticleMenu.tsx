import { useState } from 'react';
import styles from './ArticleMenu.module.scss';
import classNames from 'classnames';
import { useOutsideClick } from '../../hooks/useOutsideClick';

export interface IArticleMenuList {
  name: string;
  onClick: () => void;
}

interface IArticleMenuProps {
  extraClass?: string;
  items: IArticleMenuList[];
}

export const ArticleMenu = ({ extraClass, items }: IArticleMenuProps) => {
  const classes = classNames(styles.search, extraClass);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useOutsideClick(()=>setIsOpen(false));

  const handleDotsClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={classes} ref={ref} data-testid='article-menu'>
      <button className={styles.articleMenuDots} onClick={handleDotsClick}>
        <span className={styles.articleMenuDot}></span>
        <span className={styles.articleMenuDot}></span>
        <span className={styles.articleMenuDot}></span>
      </button>
      {isOpen && (
        <div className={styles.articleMenuList}>
          {items.map(({ name, onClick }, i) => (
            <button
              onClick={onClick}
              key={i}
              className={styles.articleMenuListItem}
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

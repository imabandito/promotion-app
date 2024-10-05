import classNames from 'classnames';
import styles from './Dropdown.module.scss';
import arrowDown from '../../../assets/arrow-down.svg';
import { useEffect, useState } from 'react';
import { useOutsideClick } from '../../../hooks/useOutsideClick';
import { ICategory } from '../../../store/reducers/articlesSlice';

interface IDropdownProps {
  type?: 'solid' | 'transparent';
  title: string;
  items: ICategory[];
  currentCategoryId: string;
  onClick: (category: string) => void;
  extraClass?: string;
}

export const Dropdown = ({
  type = 'solid',
  title,
  items,
  currentCategoryId,
  onClick,
  extraClass,
}: IDropdownProps) => {
  const classes = classNames(
    styles.dropdown,
    styles[`dropdown${type}`],
    extraClass
  );
  const [isOpen, setIsOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<ICategory>();

  const ref = useOutsideClick(() => setIsOpen(false));

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleCategoryClick = (category: ICategory) => {
    onClick(category.id);
  };

  useEffect(() => {
    const category =
      items.find(({ id }) => id === currentCategoryId) || items[0];
    setCurrentCategory(category);
  }, [currentCategoryId, items]);

  return (
    <div className={classes} ref={ref}>
      <div className={styles.dropdownTitle}>{title}:</div>
      <button
        className={styles.dropdownListToggle}
        onClick={handleDropdownToggle}
        type="button"
      >
        <div className={styles.dropdownListWrapper}>
          <div className={styles.dropdownToggle}>{currentCategory?.name}</div>
          {isOpen && (
            <ul className={styles.dropdownList}>
              {items.map((item) => (
                <li
                  key={item.id}
                  onClick={() => handleCategoryClick(item)}
                  className={
                    item.id === currentCategory?.id ? styles.selected : ''
                  }
                >
                  {item.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <span>
          <img src={arrowDown} alt="arrow" />
        </span>
      </button>
    </div>
  );
};

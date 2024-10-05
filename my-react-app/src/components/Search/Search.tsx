import styles from './Search.module.scss';
import classNames from 'classnames';
import icon from '../../assets/search-icon.svg';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { RootState } from '../../store/store';
import { setSearch } from '../../store/reducers/articlesSlice';

interface ISearchProps {
  extraClass?: string;
}

export const Search = ({ extraClass }: ISearchProps) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { search } = useSelector((state: RootState) => state.articles);
  const [searchValue, setSearchValue] = useState(search);

  const classes = classNames(styles.search, extraClass);
  const handleSearchClick = (e: FormEvent) => {
    e.preventDefault();
    dispatch(setSearch(searchValue));
    const newUrlParams = new URLSearchParams(location.search);
    newUrlParams.set('search', searchValue);
    !searchValue && newUrlParams.delete('search');
    navigate({ search: newUrlParams.toString() }, { replace: true });
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    const urlQuery = new URLSearchParams(location.search).get('search') || '';

    if (urlQuery && urlQuery !== search) {
      dispatch(setSearch(urlQuery));
      setSearchValue(urlQuery);
      const newUrlParams = new URLSearchParams(location.search);
      newUrlParams.set('search', urlQuery);
      navigate({ search: newUrlParams.toString() }, { replace: true });
    }
  }, []);

  return (
    <form className={styles.searchWrapper} onSubmit={handleSearchClick}>
      <button className={styles.searchIconButton} onClick={handleSearchClick}>
        <img src={icon} alt="search" className={styles.searchIcon} />
      </button>
      <input
        type="text"
        name="search"
        placeholder="Find articles..."
        className={classes}
        value={searchValue}
        onChange={handleSearch}
      />
    </form>
  );
};

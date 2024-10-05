import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetCategoriesQuery } from '../../store/api/articlesApi';
import { setFilter, setSortingType } from '../../store/reducers/articlesSlice';
import { RootState } from '../../store/store';
import { Button } from '../UI/Button/Button';
import { Dropdown } from '../UI/Dropdown/Dropdown';
import styles from './DashboardHeader.module.scss';
import { useEffect } from 'react';
import { PlusIcon } from '../../icons/PlusIcon';

export const DashboardHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const urlParams = new URLSearchParams(useLocation().search);

  const { isSuccess: isCategoriesSuccess } = useGetCategoriesQuery(null);
  const { sortingTypes, filter, sortingType, fullCategories } = useSelector(
    (state: RootState) => state.articles
  );

  const onCategoryChange = (category: string) => {
    dispatch(setFilter(category));
  };

  const onSortingChange = (sorting: string) => {
    dispatch(setSortingType(sorting));
  };

  const onAddArticle = () => {
    navigate('/addarticle');
  };

  useEffect(() => {
    const urlSort = urlParams.get('sort') || '';
    const urlFilter = urlParams.get('filter') || '';
    urlSort && dispatch(setSortingType(urlSort));
    urlFilter && dispatch(setFilter(urlFilter));
  }, [location.search]);

  useEffect(() => {
    sortingType && urlParams.set('sort', sortingType);
    filter && urlParams.set('filter', filter);

    navigate({ search: urlParams.toString() }, { replace: true });
  }, [sortingType, filter, navigate]);

  return (
    <div className={styles.dashboardHeader}>
      <h3 className={styles.dashboardTitle}>Articles Dashboard</h3>
      <div className={styles.dashboardActions}>
        <div className={styles.dashboardFilters}>
          {isCategoriesSuccess && (
            <Dropdown
              title="show"
              items={fullCategories}
              currentCategoryId={filter}
              type="transparent"
              onClick={onCategoryChange}
            />
          )}
          <Dropdown
            title="sort by"
            items={sortingTypes}
            currentCategoryId={sortingType}
            onClick={onSortingChange}
          />
        </div>
        <Button lookType="combine" icon={<PlusIcon/>} onClick={onAddArticle}>
          Add Article
        </Button>
      </div>
    </div>
  );
};

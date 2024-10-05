import { useSelector } from 'react-redux';
import {
  useGetCategoriesQuery,
  useGetArticlesQuery,
} from '../../store/api/articlesApi';
import { RootState } from '../../store/store';
import styles from './Articles.module.scss';
import { Loader } from '../UI/Loader/Loader';
import { ArticlePreview } from '../ArticlePreview/ArticlePreview';

export const Articles = () => {
  const {
    search,
    sortingType,
    filter,
  } = useSelector((state: RootState) => state.articles);
  const {
    isLoading: isCategoriesLoading,
  } = useGetCategoriesQuery(null);
  const {
    data: articles,
    isSuccess,
    isFetching,
  } = useGetArticlesQuery(
    { q: search, sort: sortingType, filter }
  );

  return (
    <div className={styles.articles}>
      {(isCategoriesLoading || isFetching) && <Loader />}
      {isSuccess && !isFetching && articles.length
        ? articles.map((article) => (
            <ArticlePreview article={article} key={article.id} />
          ))
        : ''}
      {isSuccess && !isFetching && !articles.length && (
        <div className={styles.articlesFallback}>
          Sorry, no articles found &#128532;
        </div>
      )}
    </div>
  );
};

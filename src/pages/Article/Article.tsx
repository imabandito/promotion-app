import { Link, useNavigate, useParams } from 'react-router-dom';
import { BasicLayout } from '../../components/BasicLayout/BasicLayout';
import { useEffect, useState } from 'react';
import { useGetArticleQuery } from '../../store/api/articlesApi';
import styles from './Article.module.scss';
import avatar from '../../assets/avatar.png';
import { format } from 'date-fns';
import { Loader } from '../../components/UI/Loader/Loader';

export const Article = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const {
    data: article,
    isLoading,
    error,
    isSuccess
  } = useGetArticleQuery(articleId, { skip: !articleId });
  const [formattedDate, setFormattedDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      return navigate(-1);
    }
    if(isSuccess){
      const dateStr = format(article.date, 'hh:mm d MMMM yyyy');
      setFormattedDate(dateStr);
    }
  }, [isLoading]);

  return (
    <BasicLayout align="center">
      {isLoading ? (
        <Loader position="relative" />
      ) : (
        <div className={styles.articleWrapper}>
          <div className={styles.articleImageWrapper}>
            <img src={article?.image} alt="article" />
            <h2 className={styles.articleTitle}>{article?.title}</h2>
          </div>
          <div className={styles.articleInfo}>
            <div className={styles.articleAuthor}>
              <Link
                to={`/author/${article?.author.id}`}
                className={styles.articleAuthorLink}
              >
                {article?.author?.name} {article?.author.lastName}
              </Link>
              <img
                src={article?.author.avatar || avatar}
                alt="author"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className={styles.articleCategory}>
              {article?.category.name}
            </div>
            <div className={styles.articleDate}>{formattedDate}</div>
          </div>
          <div className={styles.articleText}>{article?.text}</div>
        </div>
      )}
    </BasicLayout>
  );
};

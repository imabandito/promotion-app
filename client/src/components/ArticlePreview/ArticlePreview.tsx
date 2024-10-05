import styles from './ArticlePreview.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { ArticleMenu, IArticleMenuList } from '../ArticleMenu/ArticleMenu';
import { IArticle } from '../../store/reducers/articlesSlice';
import { useEffect, useState } from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import { useDeleteArticleMutation } from '../../store/api/articlesApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import avatar from '../../assets/avatar.png';
import { ArrowRightIcon } from '../../icons/ArrowRightIcon';

interface IArticlePreviewProps {
  article: IArticle;
}

export const ArticlePreview = ({
  article: { id, image, category, date, title, text, author },
}: IArticlePreviewProps) => {
  const menuList: IArticleMenuList[] = [
    {
      name: 'Edit',
      onClick: async () => {
        navigate(`/editarticle/${id}`);
      },
    },
    {
      name: 'Delete',
      onClick: async () => {
        await deleteArticle(id);
      },
    },
  ];

  const navigate = useNavigate();

  const [formattedDate, setFormattedDate] = useState('');

  const [deleteArticle] = useDeleteArticleMutation();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const articleDate = new Date(date);
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const dateStr =
      articleDate > oneMonthAgo
        ? formatDistanceToNow(articleDate, { addSuffix: true })
        : format(articleDate, 'd MMMM yyyy');
    setFormattedDate(dateStr);
    
  }, [date]);

  return (
    <div className={styles.articleWrapper} data-testid='article-preview'>
      <div className={styles.articleImageWrapper}>
        <img src={image} alt="article" />
        {user?.id === author.id && (
          <ArticleMenu extraClass={styles.articleMenu} items={menuList} />
        )}
      </div>
      <div className={styles.articleContent}>
        <div className={styles.articleInfo}>
          <div className={styles.articleCategory}>{category?.name}</div>
          <div className={styles.articleDate}>{formattedDate}</div>
        </div>
        <h2 className={styles.articleTitle} title={title}>{title}</h2>
        <div className={styles.articleText}>{text}</div>
        <div className={styles.articleBottom}>
          <div className={styles.articleAuthor}>
            <img
              src={author?.avatar || avatar}
              alt="author"
              referrerPolicy="no-referrer"
            />
            <Link
              to={`/author/${author?.id}`}
              className={styles.articleAuthorLink}
              title={`${author?.name} ${author?.lastName}`}
            >
              {author?.name} {author?.lastName}
            </Link>
          </div>
          <Link to={`/articles/${id}`} className={styles.articleReadMore}>
            Read more
            <ArrowRightIcon extraClass={styles.articleArrow} />
          </Link>
        </div>
      </div>
    </div>
  );
};

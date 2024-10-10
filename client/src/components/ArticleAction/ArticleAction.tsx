import { useForm } from 'react-hook-form';
import { Divider } from '../UI/Divider/Divider';
import TextInput from '../UI/TextInput/TextInput';
import styles from './ArticleAction.module.scss';
import TextArea from '../UI/TextArea/TextArea';
import { FilePicker } from '../FilePicker/FilePicker';
import { Button } from '../UI/Button/Button';
import {
  useAddArticleMutation,
  useEditArticleMutation,
  useGetArticleQuery,
  useGetCategoriesQuery,
} from '../../store/api/articlesApi';
import { useEffect, useState } from 'react';
import { Dropdown } from '../UI/Dropdown/Dropdown';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader } from '../UI/Loader/Loader';

interface IArticleActionProps {
  type: 'new' | 'edit';
}

interface IArticleFormValues {
  title: string;
  text: string;
}

export const ArticleAction = ({ type }: IArticleActionProps) => {
  const navigate = useNavigate();
  const { articleId } = useParams<{ articleId: string }>();

  const { register, handleSubmit, formState, reset, trigger } =
    useForm<IArticleFormValues>({
      mode: 'onBlur',
    });
  const { dirtyFields, errors, isValid, isDirty } = formState;

  const {
    data: categories,
    isLoading: isCaregoriesLoading,
    isError: isCategoriesError,
    isSuccess: isCategoriesSuccess,
  } = useGetCategoriesQuery(null);
  const {
    data: article,
    isSuccess: articleSuccess,
    isLoading: isArticleLoading,
    isError: isArticleError,
  } = useGetArticleQuery(articleId, { skip: type === 'new' || !articleId });
  const [addNewArticle, { isLoading: isAdding }] = useAddArticleMutation();
  const [editArticle, { isLoading: isEditing }] = useEditArticleMutation();

  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState<string>('');

  const isMutating = isAdding || isEditing;
  const isLoading = isCaregoriesLoading || isArticleLoading;

  const onSubmit = async (data: IArticleFormValues) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('text', data.text);
    formData.append('category', category);
    file && formData.append('image', file);

    try {
      if (type === 'new') {
        await addNewArticle(formData).unwrap();
      } else {
        await editArticle({ id: articleId, data: formData }).unwrap();
      }
      navigate('/');
    } catch (error) {
      /* empty */
    }
  };

  const onFilesDrop = (files: File[]) => {
    setFile(files[0]);
  };

  const onCategoryChange = (category: string) => {
    setCategory(category);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (articleSuccess) {
      setCategory(article.category?.id);

      reset({
        title: article.title,
        text: article.text,
      });
      trigger();
    } else if (type === 'new' && isCategoriesSuccess) {
      setCategory(categories[0]?.id);
    }
    if (isArticleError || isCategoriesError) {
      navigate(-1);
    }
  }, [
    article,
    articleSuccess,
    isArticleError,
    isCategoriesError,
    isCategoriesSuccess,
  ]);

  return (
    <div className={styles.articleAction}>
      {isLoading ? (
        <Loader position="relative" />
      ) : (
        isCategoriesSuccess && (
          <div className={styles.articleActionContent}>
            <h3>{type === 'new' ? 'Add new article' : 'Edit article'}</h3>
            <Divider color="lightgrey" />
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextInput
                title="Title"
                placeholder="Enter your title"
                extraClass={styles.articleActionTitle}
                register={{
                  ...register('title', {
                    required: 'Title is required',
                    minLength: 1,
                  }),
                }}
                error={dirtyFields.title && errors.title?.message}
              />
              <TextArea
                title="Text"
                name="Text"
                placeholder="Enter your text"
                extraClass={styles.articleActionText}
                register={{
                  ...register('text', {
                    required: 'Text is required',
                    minLength: 1,
                  }),
                }}
                error={dirtyFields.text && errors.text?.message}
              />
              <Dropdown
                title="show"
                items={categories}
                currentCategoryId={category}
                type="transparent"
                onClick={onCategoryChange}
              />
              <br />
              <FilePicker
                dropHandler={onFilesDrop}
                allowedTypes={['.jpg', '.png', '.jpeg']}
                title="Add cover photo"
                file={file}
              />
              <div className={styles.articleActionButtons}>
                <Button
                  extraClass={styles.articleActionCancel}
                  type="button"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button disabled={!isValid || isMutating || !isDirty}>
                  Publish
                </Button>
              </div>
            </form>
          </div>
        )
      )}
    </div>
  );
};

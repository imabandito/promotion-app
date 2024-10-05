import { BasicLayout } from '../../components/BasicLayout/BasicLayout'
import { ArticleAction } from '../../components/ArticleAction/ArticleAction'
import styles from './AddArticle.module.scss'

interface IAddArticleProps {
  type?: 'new'| 'edit'
}

export const AddArticle = ({type = 'new'}:IAddArticleProps)=> {
  
  return (
    <BasicLayout extraClass={styles.container} align='center'>
        <ArticleAction type={type}/>
    </BasicLayout>
  )
}

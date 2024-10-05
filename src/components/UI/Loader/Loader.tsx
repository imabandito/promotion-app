import styles from './Loader.module.scss';
import classNames from 'classnames';

interface ILoaderProps{
    extraClass?: string;
    position?:'absolute'| 'relative'
}

export const Loader = ({extraClass, position = 'absolute'}: ILoaderProps)=> {
    const classes = classNames(styles.loader, extraClass, styles[position])
  return (
    <div className={classes}>
        <div></div>
        <div></div>
        <div></div>
    </div>
  )
}

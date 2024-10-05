import { createPortal } from 'react-dom';
import styles from './MessagePopUp.module.scss';
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { useEffect } from 'react';
import { setIsActive } from '../../store/reducers/messageSlice';

export const MessagePopUp = () => {
  const dispatch = useDispatch();
  const { isActive, message, type, time, text, messageId } = useSelector(
    (state: RootState) => state.message
  );

  const classes = classNames(
    styles.pop,
    styles[`pop${type}`],
    !isActive && styles.popHide
  );

  useEffect(() => {
    if (isActive) {
      const timeout = setTimeout(() => {
        dispatch(setIsActive(false));
      }, time);

      return () => clearTimeout(timeout);
    }
  }, [messageId, isActive]);

  return createPortal(
    <div className={classes}>
      <h6>{message}</h6>
      <p>{text}</p>
    </div>,
    document.body
  );
};

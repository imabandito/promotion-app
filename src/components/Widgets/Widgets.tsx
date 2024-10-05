import { useState } from 'react';
import styles from './Widgets.module.scss';
import widgetIcon from '../../assets/widget.png';
import { Button } from '../UI/Button/Button';
import classNames from 'classnames';
import { WeatherWidget } from '../WeatherWidget/WeatherWidget';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export const Widgets = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    showWidgets,
    widgetsStatuses: { weather },
  } = useSelector((state: RootState) => state.widgets);
  const onWidgetClick = () => {
    setIsOpen(!isOpen);
  };

  const classes = classNames(
    styles.widgets,
    isOpen && styles.widgetsOpen,
    showWidgets && styles.widgetsShow
  );

  const widgets = [
    {
      component: <WeatherWidget />,
      status: weather,
      id:'weather'
    },
  ];

  return (
    <div className={classes}>
      <div className={styles.widgetsThumbnail}>
        <div className={styles.widgetsClose} onClick={onWidgetClick}></div>
        <div className={styles.widgetsIconWrapper}>
          <Button
            icon={widgetIcon}
            lookType="image"
            extraClass={styles.widgetsButton}
            onClick={onWidgetClick}
          />
        </div>
      </div>
      <div className={styles.widgetsContent}>
        {widgets.map(
          ({ component, status, id }) => status !== 'rejected' && <div key={id}>{component}</div>
        )}
      </div>
    </div>
  );
};

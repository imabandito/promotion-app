import { useEffect, useState } from 'react';
import { useGetWeatherQuery } from '../../store/api/weatherApi';
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { Widget } from '../Widget/Widget';
import { format } from 'date-fns';
import styles from './WeatherWidget.module.scss';
import { Loader } from '../UI/Loader/Loader';
import { setWidgetsStatuses } from '../../store/reducers/widgetsSlice';

export const WeatherWidget = () => {
  const dispatch = useDispatch();

  const [dayMonth, setDayMonth] = useState('');
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const [dayWeek, setDayWeek] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const {isLoading, isSuccess } = useGetWeatherQuery(locationQuery,{
    skip: !locationQuery
  });
  const { temparature, city, date, conditionIcon, condition, country } =
    useSelector((state: RootState) => state.weather);

  const rejectWeather = () => {
    setIsLocationLoading(false);
    dispatch(
      setWidgetsStatuses({
        weather: 'rejected',
      })
    );
  };

  useEffect(() => {
    setIsLocationLoading(true);

    if (!('geolocation' in navigator)) {
      rejectWeather();

      return;
    }
    navigator.geolocation.getCurrentPosition(async (position) => {
        setIsLocationLoading(false);
        setLocationQuery(`${position.coords.latitude},${position.coords.longitude}`);
    }, rejectWeather);
  }, []);

  useEffect(() => {
    if (date) {
      setDayMonth(format(date, 'MMMM dd'));
      setDayWeek(format(date, 'EEEE'));
    }
  }, [date]);

  return (
    <Widget title="weather widget">
      {(isLoading || isLocationLoading) && <Loader position="relative"/>}
      {isSuccess && (
        <div className={styles.weather} data-testid="widget-content">
          <div className={styles.weatherMonth}>{dayMonth}</div>
          <div className={styles.weatherDay}>{dayWeek}</div>
          <div className={styles.weatherRow}>
            <div className={styles.weatherCol}>
              <div className={styles.weatherTemp}>
                <span className={styles.weatherTempValue}>{temparature}</span>
                <span className={styles.weatherCelsius}>&#x2103;</span>
              </div>
              <div className={styles.weatherLocation}>
                {city}, {country}
              </div>
            </div>
            <div className={styles.weatherIcon}>
              <img src={conditionIcon} alt={condition} />
            </div>
          </div>
        </div>
      )}
    </Widget>
  );
};

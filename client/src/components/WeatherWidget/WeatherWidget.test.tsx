/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, waitFor } from '@testing-library/react';
import { WeatherWidget } from './WeatherWidget';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { useLazyGetWeatherQuery } from '../../store/api/weatherApi';

jest.mock('../../store/api/weatherApi', () => ({
  useLazyGetWeatherQuery: jest.fn(),
}));

const mockStore = configureStore([]);

describe('WeatherWidget Component', () => {
  let store: any;
  let mockGetWeather: jest.Mock;

  const mockWeatherState = {
    weather: {
      temparature: '21',
      city: 'Lviv',
      date: new Date('2012-09-20T00:00:00Z'),
      conditionIcon: 'sunny.png',
      condition: 'Sunny',
      country: 'Ukraine',
    },
  };

  beforeEach(() => {
    store = mockStore({
      weather: mockWeatherState.weather,
    });

    mockGetWeather = jest.fn().mockResolvedValue({});
    (useLazyGetWeatherQuery as jest.Mock).mockReturnValue([
      mockGetWeather,
      { isLoading: false, isSuccess: true },
    ]);

    const mockGeolocation = {
      getCurrentPosition: jest.fn(),
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    global.navigator.geolocation = mockGeolocation;
  });

  const renderComponent = () => {
    return render(
      <Provider store={store}>
        <WeatherWidget />
      </Provider>
    );
  };

  test('renders Widget', () => {
    renderComponent();

    const widget = screen.getByText('weather widget');
    expect(widget).toBeInTheDocument();
  });

  test('shows Loader when isLoading is true', () => {
    (useLazyGetWeatherQuery as jest.Mock).mockReturnValue([
      mockGetWeather,
      { isLoading: true },
    ]);
    renderComponent();
    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
  });

  test('fetches weather data', async () => {
    const mockGeolocation = navigator.geolocation as jest.Mocked<
      typeof navigator.geolocation
    >;
    mockGeolocation.getCurrentPosition.mockImplementationOnce((success) =>
      success({
        coords: {
          latitude: 49.0010837,
          longitude: 29.8301727,
        },
        timestamp: Date.now(),
      } as any)
    );

    renderComponent();

    await waitFor(() => {
      expect(mockGetWeather).toHaveBeenCalledWith('49.0010837,29.8301727');
    });
  });

  test('renders weather information when isSuccess is true', () => {
    renderComponent();

    const dayMonth = screen.getByText('September 20');
    expect(dayMonth).toBeInTheDocument();

    const dayWeek = screen.getByText('Thursday');
    expect(dayWeek).toBeInTheDocument();

    const temperature = screen.getByText('21');
    expect(temperature).toBeInTheDocument();

    const location = screen.getByText('Lviv, Ukraine');
    expect(location).toBeInTheDocument();

    const conditionImg = screen.getByAltText('Sunny') as HTMLImageElement;
    expect(conditionImg).toBeInTheDocument();
    expect(conditionImg.src).toContain('sunny.png');
  });

  test('does not render when isSuccess is false', () => {
    (useLazyGetWeatherQuery as jest.Mock).mockReturnValue([
      mockGetWeather,
      { isLoading: false, isSuccess: false },
    ]);

    renderComponent();

    const content = screen.queryByTestId('widget-content');
    expect(content).not.toBeInTheDocument();
  });
});

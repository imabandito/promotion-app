/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, waitFor } from '@testing-library/react';
import { WeatherWidget } from './WeatherWidget';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { useLazyGetWeatherQuery } from '../../store/api/weatherApi';
import { format } from 'date-fns';

jest.mock('../../store/api/weatherApi', () => ({
  useLazyGetWeatherQuery: jest.fn(),
}));

jest.mock('date-fns', () => {
  const original = jest.requireActual('date-fns');
  return {
    ...original,
    format: jest.fn(original.format),
  };
});

jest.mock('../Widget/Widget', () => ({
  Widget: ({ title, children }: any) => (
    <div data-testid="widget">
      <h1>{title}</h1>
      {children}
    </div>
  ),
}));

jest.mock('../UI/Loader/Loader', () => ({
  Loader: () => <div data-testid="loader"></div>,
}));

const mockStore = configureStore([]);

describe('WeatherWidget Component', () => {
  let store: any;
  let mockGetWeather: jest.Mock;
  let mockFormat: jest.Mock;

  const mockWeatherState = {
    weather: {
      temparature: '21',
      city: 'Lviv',
      date: new Date('2012-09-20T23:00:00Z'),
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

    mockFormat = format as jest.Mock;
    mockFormat.mockImplementation((_, formatStr: string) => {
      if (formatStr === 'MMMM dd') return 'September 20';
      if (formatStr === 'EEEE') return 'Friday';
      return '';
    });

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
    const dayWeek = screen.getByText('Friday');
    expect(dayMonth).toBeInTheDocument();
    expect(dayWeek).toBeInTheDocument();

    const temperature = screen.getByText('21');
    expect(temperature).toBeInTheDocument();

    const location = screen.getByText('Lviv, Ukraine');
    expect(location).toBeInTheDocument();

    const conditionImg = screen.getByAltText('Sunny') as HTMLImageElement;
    expect(conditionImg).toBeInTheDocument();
    expect(conditionImg.src).toContain('sunny.png');
  });

  test('render fallback when isSuccess is false', () => {
    (useLazyGetWeatherQuery as jest.Mock).mockReturnValue([
      mockGetWeather,
      { isLoading: false, isSuccess: false },
    ]);

    renderComponent();

    const content = screen.queryByTestId('widget-content');
    expect(content).not.toBeInTheDocument();
  });
});

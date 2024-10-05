import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface WeatherState {
    city: string;
    country: string;
    region?: string;
    date: string;
    temparature: number;
    condition: string;
    conditionIcon: string;
    humidity: string;
    wind: string;
}

const initialState: WeatherState = {
    city: '',
    country: '',
    region: '',
    date: '',
    temparature: 0,
    condition: '',
    conditionIcon: '',
    humidity: '',
    wind: ''
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setWeather: (state, { payload }: PayloadAction<any>) => {
      state.city = payload.location.name;
      state.country = payload.location.country;
      state.region = payload.location.region;
      state.date = payload.location.localtime;
      state.temparature = Math.round(+payload.current.temp_c);
      state.condition = payload.current.condition.text;
      state.conditionIcon = payload.current.condition.icon
      state.humidity = payload.current.humidity;
      state.wind = payload.current.wind_kph;
    },
  },
});

export const {
    setWeather
} = weatherSlice.actions;

export default weatherSlice.reducer;

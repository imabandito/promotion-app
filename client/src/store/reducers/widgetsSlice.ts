import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type WidgetStatus = 'pending' | 'fulfilled' | 'rejected';

interface WidgetsStatuses {
  weather: WidgetStatus;
}

interface WidgetsState {
  widgetsStatuses: WidgetsStatuses;
  showWidgets: boolean;
}

const initialState: WidgetsState = {
  widgetsStatuses: {
    weather: 'pending',
  },
  showWidgets: true,
};

const widgetsSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setWidgetsStatuses: (
      state,
      { payload }: PayloadAction<Partial<WidgetsStatuses>>
    ) => {
      state.widgetsStatuses = {
        ...state.widgetsStatuses,
        ...payload,
      };
      const showWidgets = Object.values(state.widgetsStatuses).some(
        (status) => status === 'fulfilled'
      );
      state.showWidgets = showWidgets;
    },
  },
});

export const { setWidgetsStatuses } = widgetsSlice.actions;

export default widgetsSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type messageTypes = 'success' | 'warning' | 'error';
interface MessageState {
  isActive: boolean;
  message: string;
  type: messageTypes;
  time: number;
  text: string;
  messageId: number;
}

const initialState: MessageState = {
  isActive: false,
  message: '',
  text: '',
  type: 'success',
  time: 5000,
  messageId: 0
};

const messageSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsActive: (state, action: PayloadAction<boolean>) => {
      state.isActive = action.payload;
    },
    setMessage: (state, action: PayloadAction<string>) => {
      state.isActive = true;
      state.message = action.payload;
    },
    setText: (state, action: PayloadAction<string>) => {
      state.isActive = true;
      state.message = action.payload;
    },
    setTime: (state, action: PayloadAction<number>) => {
      state.time = action.payload;
    },
    setType: (state, action: PayloadAction<messageTypes>) => {
      state.type = action.payload;
    },
    setMessageState: (state, action: PayloadAction<Partial<MessageState>>) => {
      return {
        ...initialState,
        isActive: true,
        messageId: state.messageId+1,
        ...action.payload,
      };      
    },
  },
});

export const { setIsActive, setMessage, setTime, setType, setMessageState, setText } =
  messageSlice.actions;

export default messageSlice.reducer;

import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';
import './index.css';
import './index.scss';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { MessagePopUp } from './components/MessagePopUp/MessagePopUp.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ThemeProvider>
      <App />
      <MessagePopUp/>
    </ThemeProvider>
  </Provider>
);

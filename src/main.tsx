import { ThemeProvider, createTheme } from '@mui/material/styles';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import App from './App';
import './index.css';

// External CSS
import 'react-toastify/dist/ReactToastify.css';
import store from './redux/store';
import { SocketContext, socket } from './context/socket';

const theme = createTheme({
    typography: {
        fontFamily: `"Lato", sans-serif`,
    },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <ThemeProvider theme={theme}>
        <SocketContext.Provider value={socket}>
            <Provider store={store}>
                <App />
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </Provider>
        </SocketContext.Provider>
    </ThemeProvider>
);

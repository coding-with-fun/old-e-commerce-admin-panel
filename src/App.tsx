import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import _ from 'lodash';
import { useContext, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { GetProfileAPI } from './apis/profile';
import { SocketContext } from './context/socket';
import { useAppDispatch } from './hooks/redux';
import { setUserDetails } from './redux/slice/user.slice';
import router from './router';
import { getUserToken } from './utils/manageUserToken';

const App = (): JSX.Element => {
    const dispatch = useAppDispatch();

    const socket = useContext(SocketContext);

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
            },
        },
    });

    const handleGetProfile = async (): Promise<void> => {
        const data = await GetProfileAPI();
        dispatch(setUserDetails(_.get(data, 'admin', {})));
    };

    useEffect(() => {
        const token = getUserToken();
        if (token != null && token !== '') {
            void handleGetProfile();
        }

        socket.on('connect', () => {
            console.log(socket.id);
        });
        socket.on('disconnect', () => {
            console.log('User disconnected...');
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    );
};

export default App;

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { useEffect } from 'react';
import { GetProfileAPI } from './apis/profile';
import { useAppDispatch } from './hooks/redux';
import { setUserDetails } from './redux/slice/user.slice';
import _ from 'lodash';
import { getUserToken } from './utils/manageUserToken';

const App = (): JSX.Element => {
    const dispatch = useAppDispatch();
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

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    );
};

export default App;

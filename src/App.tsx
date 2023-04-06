import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import './libs/interceptor';
import router from './router';

const App = (): JSX.Element => {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    );
};

export default App;

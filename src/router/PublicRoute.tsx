import { Navigate } from 'react-router-dom';
import { getUserToken } from '../utils/localToken';

const PublicRoute = ({ children }: { children: JSX.Element }): JSX.Element => {
    const token = getUserToken();

    if (![null, ''].includes(token)) {
        return <Navigate to="/dashboard" replace={true} />;
    }

    return children;
};

export default PublicRoute;

import { Navigate } from 'react-router-dom';
import { getUserToken } from '../utils/manageUserToken';
import routes from './routes';

const PublicRoute = ({ children }: { children: JSX.Element }): JSX.Element => {
    const token = getUserToken();

    if (![null, ''].includes(token)) {
        return <Navigate to={routes.private.dashboard} replace={true} />;
    }

    return children;
};

export default PublicRoute;

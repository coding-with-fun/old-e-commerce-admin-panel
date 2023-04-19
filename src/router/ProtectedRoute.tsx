import { Navigate, useLocation } from 'react-router-dom';
import { getUserToken } from '../utils/manageUserToken';
import routes from './routes';

const ProtectedRoute = ({
    children,
}: {
    children: JSX.Element;
}): JSX.Element => {
    const token = getUserToken();
    const location = useLocation();

    if ([null, ''].includes(token)) {
        return (
            <Navigate
                to={`${routes.public.signin}?redirect=${location.pathname}`}
                replace={true}
            />
        );
    }

    return children;
};

export default ProtectedRoute;

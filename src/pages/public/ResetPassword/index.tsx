import { useSearchParams } from 'react-router-dom';

const ResetPassword = (): JSX.Element => {
    const [searchParams] = useSearchParams();
    console.log(searchParams.get('token'));

    return <div>ResetPassword</div>;
};

export default ResetPassword;

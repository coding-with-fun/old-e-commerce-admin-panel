import { useQuery } from '@tanstack/react-query';
import { GetAdminDetailsAPI } from '../../../../apis/admin';
import { useParams } from 'react-router-dom';

const AdminDetails = (): JSX.Element => {
    const { adminID } = useParams();

    useQuery({
        queryFn: async () => {
            if (adminID !== undefined) {
                await GetAdminDetailsAPI(adminID);
            }
        },
        onSuccess(data) {
            console.log(data);
        },
    });

    return <div>AdminDetails</div>;
};

export default AdminDetails;

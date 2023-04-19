import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import routes from '../../router/routes';

const SidebarLinks = [
    {
        id: 0,
        label: 'Admin',
        path: routes.private.admin.list,
        icon: SupervisorAccountIcon,
    },
];

export default SidebarLinks;

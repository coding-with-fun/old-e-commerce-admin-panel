import { type GridColDef } from '@mui/x-data-grid';
import ActivationSwitch from './ActivationSwitch';
import ActionButtons from './ActionButtons';

const columns: GridColDef[] = [
    {
        field: '_id',
        headerName: 'ID',
        width: 250,
    },
    {
        field: 'contactNumber',
        headerName: 'Contact number',
        width: 150,
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 150,
    },
    {
        field: 'name',
        headerName: 'Name',
        width: 150,
    },
    {
        field: 'isActive',
        headerName: 'Is active',
        sortable: false,
        renderCell: ActivationSwitch,
    },
    {
        field: 'actions',
        headerName: 'Actions',
        sortable: false,
        renderCell: ActionButtons,
    },
];

export default columns;

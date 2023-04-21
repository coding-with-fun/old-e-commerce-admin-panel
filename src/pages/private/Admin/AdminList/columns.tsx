import { type GridColDef } from '@mui/x-data-grid';
import ActivationSwitch from './ActivationSwitch';

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
        // align: 'center',
        renderCell: ActivationSwitch,
    },
];

export default columns;

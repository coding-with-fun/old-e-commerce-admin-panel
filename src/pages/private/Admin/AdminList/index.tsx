import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import {
    DataGrid,
    type GridColDef,
    type GridRowsProp,
    type GridSortModel,
} from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import _ from 'lodash';
import { useState } from 'react';
import { FetchAdminListAPI } from '../../../../apis/admin';

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
];

const AdminList = (): JSX.Element => {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [sortModel, setSortModel] = useState<GridSortModel>([
        {
            field: 'createdAt',
            sort: 'desc',
        },
    ]);

    const { isLoading, data, isError } = useQuery({
        queryFn: async () =>
            await FetchAdminListAPI(
                page + 1,
                pageSize,
                sortModel[0]?.field ?? 'createdAt',
                sortModel[0]?.sort ?? 'desc'
            ),
        queryKey: [page, pageSize, sortModel],
    });

    const rows: GridRowsProp = _.get(data, 'admins', []);

    return isError ? (
        <div>Something went wrong.</div>
    ) : (
        <Box
            sx={{
                width: '100%',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '1rem',
                }}
            >
                <Box
                    sx={{
                        backgroundColor: 'rgba(0, 0, 0, 0.06)',
                        borderRadius: '4px',
                        padding: '8px 16px 8px 0',
                        display: 'flex',
                    }}
                >
                    <Box
                        sx={{
                            padding: '0px 16px',
                            pointerEvents: 'none',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <SearchIcon
                            sx={{
                                color: 'rgba(0, 0, 0, 0.54)',
                            }}
                        />
                    </Box>
                    <InputBase placeholder="Search" />
                </Box>
            </Box>

            <DataGrid
                autoHeight
                disableColumnFilter
                disableColumnMenu
                disableColumnSelector
                disableDensitySelector
                disableRowSelectionOnClick
                getRowId={(row) => row._id}
                rows={rows}
                columns={columns}
                loading={isLoading}
                rowCount={_.get(data, 'pagination.total', 0)}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize,
                            page,
                        },
                    },
                }}
                onPaginationModelChange={(model) => {
                    setPage(model.page);
                    setPageSize(model.pageSize);
                }}
                pageSizeOptions={[1, 5, 10, 25]}
                sortModel={sortModel}
                onSortModelChange={(newSortModel) => {
                    setSortModel(newSortModel);
                }}
            />
        </Box>
    );
};

export default AdminList;

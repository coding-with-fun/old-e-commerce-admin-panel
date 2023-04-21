import Box from '@mui/material/Box';
import { DataGrid, type GridSortModel } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { FetchAdminListAPI } from '../../../../apis/admin';
import NoRowsOverlay from './NoRowsOverlay';
import SearchFilter from './SearchFilter';
import columns from './columns';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { refetchAdminList } from '../../../../redux/slice/global.slice';

const AdminList = (): JSX.Element => {
    const fetchAdminList = useAppSelector(
        (state) => state.global.fetchAdminList
    );
    const dispatch = useAppDispatch();

    const [query, setQuery] = useState('');
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [sortModel, setSortModel] = useState<GridSortModel>([]);

    const [adminsList, setAdminsList] = useState<AdminListType[]>([]);

    const { isLoading, isFetching, data, isError, refetch } = useQuery({
        queryFn: async () =>
            await FetchAdminListAPI(
                page + 1,
                pageSize,
                sortModel[0]?.field ?? 'createdAt',
                sortModel[0]?.sort ?? 'desc',
                query
            ),
        queryKey: ['FetchAdminList', page, pageSize, sortModel],
        keepPreviousData: false,
        onSuccess(data) {
            setAdminsList(_.get(data, 'admins', []));
        },
    });

    // Search query debounce
    useEffect(() => {
        const getData = setTimeout(() => {
            if (query !== '') {
                void refetch();
            }
        }, 1000);

        return () => {
            clearTimeout(getData);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    // When admin is deleted refetch the list
    useEffect(() => {
        if (fetchAdminList) {
            void refetch();
            dispatch(refetchAdminList(false));
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchAdminList]);

    return isError ? (
        <div>Something went wrong.</div>
    ) : (
        <Box
            sx={{
                width: '100%',
            }}
        >
            <SearchFilter query={query} setQuery={setQuery} />

            <DataGrid
                autoHeight
                disableColumnFilter
                disableColumnMenu
                disableColumnSelector
                disableDensitySelector
                disableRowSelectionOnClick
                getRowId={(row) => row._id}
                rows={adminsList}
                columns={columns}
                loading={isLoading || isFetching}
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
                slots={{
                    noResultsOverlay: NoRowsOverlay,
                    noRowsOverlay: NoRowsOverlay,
                }}
            />
        </Box>
    );
};

export default AdminList;

export interface AdminListType {
    _id: any;
    name: string;
    email: string;
    newEmail: string | undefined;
    contactNumber: string;
    isActive: boolean;
    profilePicture: string;
    isSuperAdmin: boolean;
}

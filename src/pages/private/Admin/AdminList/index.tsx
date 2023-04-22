import Box from '@mui/material/Box';
import { DataGrid, type GridSortModel } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import _ from 'lodash';
import { useContext, useEffect, useState } from 'react';
import { FetchAdminListAPI } from '../../../../apis/admin';
import { SocketContext } from '../../../../context/socket';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { refetchAdminList } from '../../../../redux/slice/global.slice';
import NoRowsOverlay from './NoRowsOverlay';
import SearchFilter from './SearchFilter';
import columns from './columns';

const AdminList = (): JSX.Element => {
    const fetchAdminList = useAppSelector(
        (state) => state.global.fetchAdminList
    );
    const dispatch = useAppDispatch();
    const socket = useContext(SocketContext);

    const [query, setQuery] = useState<string | undefined>();
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalData, setTotalData] = useState(10);
    const [sortModel, setSortModel] = useState<GridSortModel>([
        {
            field: 'createdAt',
            sort: 'desc',
        },
    ]);

    const [adminsList, setAdminsList] = useState<AdminListType[]>([]);
    const [dataUpdated, setDataUpdated] = useState(false);

    const { isLoading, isFetching, isError, refetch } = useQuery({
        queryFn: async () =>
            await FetchAdminListAPI(
                page + 1,
                pageSize,
                sortModel[0]?.field ?? 'createdAt',
                sortModel[0]?.sort ?? 'desc',
                query ?? ''
            ),
        queryKey: ['FetchAdminList', page, pageSize, sortModel],
        keepPreviousData: false,
        onSuccess(data) {
            setAdminsList(_.get(data, 'admins', []));
            setTotalData(_.get(data, 'pagination.total', 0));
            setDataUpdated(false);
        },
    });

    // Search query debounce
    useEffect(() => {
        const getData = setTimeout(() => {
            if (query !== undefined) {
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

    // Listen to socket events
    useEffect(() => {
        socket.on('new_admin', () => {
            setDataUpdated(true);
        });

        return () => {
            socket.off('new_admin');
        };
    }, [socket]);

    return isError ? (
        <div>Something went wrong.</div>
    ) : (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
            }}
        >
            <Box
                sx={{
                    maxWidth: '100%',
                }}
            >
                <SearchFilter
                    query={query ?? ''}
                    dataUpdated={dataUpdated}
                    setQuery={setQuery}
                    refetch={refetch}
                />

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
                    rowCount={totalData}
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
        </Box>
    );
};

export default AdminList;

export interface AdminListType {
    _id: any;
    id: string;
    name: string;
    email: string;
    newEmail: string | undefined;
    contactNumber: string;
    isActive: boolean;
    profilePicture: string;
    isSuperAdmin: boolean;
}

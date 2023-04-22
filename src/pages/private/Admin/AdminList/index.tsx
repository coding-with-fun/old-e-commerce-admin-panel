import Box from '@mui/material/Box';
import { DataGrid, type GridSortDirection } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import _ from 'lodash';
import { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
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
    const [searchParams, setSearchParams] = useSearchParams();

    const [query, setQuery] = useState<string>('');
    const [page, setPage] = useState('1');
    const [pageSize, setPageSize] = useState('10');
    const [totalData, setTotalData] = useState(10);
    const [sortField, setSortField] = useState('createdAt');
    const [sortDirection, setSortDirection] =
        useState<GridSortDirection>('desc');
    const [areFiltersSet, setAreFiltersSet] = useState(false);

    const [adminsList, setAdminsList] = useState<AdminListType[]>([]);
    const [dataUpdated, setDataUpdated] = useState(false);

    const { isLoading, isFetching, isError, refetch } = useQuery({
        queryFn: async () =>
            await FetchAdminListAPI(
                +page,
                +pageSize,
                sortField,
                sortDirection,
                query ?? ''
            ),
        queryKey: ['FetchAdminList'],
        keepPreviousData: false,
        onSuccess(data) {
            setAdminsList(_.get(data, 'admins', []));
            setTotalData(_.get(data, 'filter.total', 0));
            setDataUpdated(false);

            setSearchParams({
                query: _.get(data, 'filter.query', ''),
                field: _.get(data, 'filter.field', 'createdAt'),
                sort: _.get(data, 'filter.sort', 'desc'),
                page: _.get(data, 'filter.page', '1'),
                pageSize: _.get(data, 'filter.pageSize', '10'),
            });

            // setAreFiltersSet(false);
        },
        enabled: false,
    });

    // Update state with the search params
    useEffect(() => {
        const searchParamQuery = searchParams.get('query') ?? '';
        setQuery(searchParamQuery);

        const searchParamField = searchParams.get('field') ?? 'createdAt';
        setSortField(searchParamField);

        const searchParamSortDirection = (searchParams.get('sort') ??
            'desc') as GridSortDirection;
        setSortDirection(searchParamSortDirection);

        const searchParamPage = searchParams.get('page') ?? '1';
        setPage(searchParamPage);

        const searchParamPageSize = searchParams.get('pageSize') ?? '10';
        setPageSize(searchParamPageSize);

        setAreFiltersSet(true);
    }, [searchParams]);

    useEffect(() => {
        if (areFiltersSet) {
            console.log('API CALLED');
            console.log(query);

            void refetch();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query, page, pageSize, areFiltersSet]);

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
        socket.on('entry_updated', () => {
            setDataUpdated(true);
        });

        return () => {
            socket.off('entry_updated');
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
                {isLoading ? null : (
                    <SearchFilter
                        query={query}
                        dataUpdated={dataUpdated}
                        setQuery={setQuery}
                        setPage={setPage}
                        refetch={refetch}
                    />
                )}

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
                                pageSize: +pageSize,
                                page: +page - 1,
                            },
                        },
                    }}
                    onPaginationModelChange={(model) => {
                        setPage(`${model.page + 1}`);
                        setPageSize(`${model.pageSize}`);
                    }}
                    pageSizeOptions={[1, 5, 10, 25]}
                    sortModel={[
                        {
                            field: sortField,
                            sort: sortDirection,
                        },
                    ]}
                    onSortModelChange={(newSortModel) => {
                        setSortField(newSortModel[0].field);
                        setSortDirection(newSortModel[0].sort);
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

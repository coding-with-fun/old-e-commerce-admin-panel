import CachedIcon from '@mui/icons-material/Cached';
import SearchIcon from '@mui/icons-material/Search';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {
    type QueryObserverResult,
    type RefetchOptions,
    type RefetchQueryFilters,
} from '@tanstack/react-query';
import { type AxiosResponse } from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '../../../../router/routes';

const SearchFilter = (props: IProps): JSX.Element => {
    const { query, dataUpdated, setQuery, setPage, refetch } = props;

    const navigate = useNavigate();

    const initialRender = useRef(true);

    const [tempQuery, setTempQuery] = useState<string>(query);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (): void => {
        setAnchorEl(null);
    };

    // Search query debounce
    useEffect(() => {
        const getData = setTimeout(() => {
            if (initialRender.current) {
                initialRender.current = false;
            } else {
                setQuery(tempQuery);
                setPage('1');
            }
        }, 1000);

        return () => {
            clearTimeout(getData);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tempQuery]);

    useEffect(() => {
        setTempQuery(query);
    }, [query]);

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
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
                <InputBase
                    placeholder="Search"
                    value={tempQuery}
                    onChange={(event) => {
                        setTempQuery(event.target.value);
                    }}
                />
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '1rem',
                }}
            >
                {dataUpdated ? (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '1rem',
                        }}
                    >
                        <Typography>Data updated</Typography>

                        <CachedIcon
                            sx={{
                                cursor: 'pointer',
                            }}
                            onClick={() => {
                                void refetch();
                            }}
                        />
                    </Box>
                ) : null}

                <Box>
                    <Button
                        id="add-admin-button"
                        variant="outlined"
                        onClick={() => {
                            navigate(routes.private.admin.create);
                        }}
                    >
                        Create admin
                    </Button>
                </Box>

                <Box>
                    <Button
                        id="export-button"
                        variant="contained"
                        aria-controls={open ? 'export-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        Export
                    </Button>

                    <Menu
                        id="export-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'export-button',
                        }}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu>
                </Box>
            </Box>
        </Box>
    );
};

export default SearchFilter;

interface IProps {
    query: string;
    dataUpdated: boolean;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
    setPage: React.Dispatch<React.SetStateAction<string>>;
    refetch: <TPageData>(
        options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
    ) => Promise<QueryObserverResult<AxiosResponse<any, any>, unknown>>;
}

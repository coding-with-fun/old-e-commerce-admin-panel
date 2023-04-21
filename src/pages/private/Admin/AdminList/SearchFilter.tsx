import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '../../../../router/routes';

const SearchFilter = (props: IProps): JSX.Element => {
    const { query, setQuery } = props;

    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (): void => {
        setAnchorEl(null);
    };

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
                    value={query}
                    onChange={(event) => {
                        setQuery(event.target.value);
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
    setQuery: React.Dispatch<React.SetStateAction<string | undefined>>;
}

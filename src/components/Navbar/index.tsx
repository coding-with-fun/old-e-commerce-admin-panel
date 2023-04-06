import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar, {
    type AppBarProps as MuiAppBarProps,
} from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { Fragment, useState, type MouseEvent, useEffect } from 'react';
import env from '../../env';
import MiniDrawer from './Sidebar';
import { getUserToken } from '../../utils/manageUserToken';
import { useLocation } from 'react-router-dom';

const settings = ['Profile', 'Logout'];

const Navbar = (): JSX.Element => {
    const location = useLocation();
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [openSideBar, setOpenSideBar] = useState(false);
    const [userToken, setUserToken] = useState(getUserToken());

    const handleOpenUserMenu = (event: MouseEvent<HTMLElement>): void => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = (): void => {
        setAnchorElUser(null);
    };

    const handleDrawerOpen = (): void => {
        setOpenSideBar(true);
    };
    const handleDrawerClose = (): void => {
        setOpenSideBar(false);
    };

    useEffect(() => {
        setUserToken(getUserToken());

        if (userToken === null || userToken === '') {
            handleDrawerClose();
        }
    }, [location, userToken]);

    return (
        <Fragment>
            <AppBar position="fixed" open={openSideBar}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                                mr: {
                                    xs: 0,
                                    md: 2,
                                },
                                ...((openSideBar ||
                                    userToken === null ||
                                    userToken === '') && {
                                    display: 'none',
                                }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>

                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: {
                                    xs: 'none',
                                    md: 'flex',
                                },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            {env.app.app_name}
                        </Typography>

                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href=""
                            sx={{
                                mr: 2,
                                display: {
                                    xs: 'flex',
                                    md: 'none',
                                },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            {env.app.app_name}
                        </Typography>

                        <Box
                            sx={{
                                flexGrow: 1,
                                display: {
                                    xs: 'none',
                                    md: 'flex',
                                },
                            }}
                        />

                        <Box
                            sx={{
                                flexGrow: 0,
                            }}
                        >
                            <Tooltip title="Open settings">
                                <IconButton
                                    onClick={handleOpenUserMenu}
                                    sx={{
                                        p: 0,
                                        ...((userToken === null ||
                                            userToken === '') && {
                                            display: 'none',
                                        }),
                                    }}
                                >
                                    <Avatar
                                        alt="Remy Sharp"
                                        src="/static/images/avatar/2.jpg"
                                    />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{
                                    mt: '45px',
                                }}
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem
                                        key={setting}
                                        onClick={handleCloseUserMenu}
                                    >
                                        <Typography textAlign="center">
                                            {setting}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            {userToken === null || userToken === '' ? null : (
                <MiniDrawer
                    handleDrawerClose={handleDrawerClose}
                    openSideBar={openSideBar}
                />
            )}
        </Fragment>
    );
};
export default Navbar;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open === true && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

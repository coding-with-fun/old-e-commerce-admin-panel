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
import _ from 'lodash';
import { Fragment, useEffect, useState, type MouseEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import env from '../../env';
import { useAppSelector } from '../../hooks/redux';
import { getUserToken, removeUserToken } from '../../utils/manageUserToken';
import MiniDrawer from './Sidebar';

// const settings = ['Profile', 'Sign Out'];

const Navbar = (): JSX.Element => {
    const location = useLocation();
    const navigate = useNavigate();

    const userDetails = useAppSelector((state) => state.user.userDetails);

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

    const handleSignOut = (): void => {
        removeUserToken();
        navigate('/signin', {
            replace: true,
        });
        handleCloseUserMenu();
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
                            onClick={() => {
                                navigate('/dashboard');
                            }}
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
                                cursor: 'pointer',
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
                                        alt={_.get(userDetails, 'name')}
                                        src={_.get(
                                            userDetails,
                                            'profilePicture'
                                        )}
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
                                <MenuItem
                                    onClick={() => {
                                        navigate('/profile');
                                        handleCloseUserMenu();
                                    }}
                                >
                                    <Typography textAlign="center">
                                        Profile
                                    </Typography>
                                </MenuItem>

                                <MenuItem onClick={handleSignOut}>
                                    <Typography textAlign="center">
                                        Sign Out
                                    </Typography>
                                </MenuItem>
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

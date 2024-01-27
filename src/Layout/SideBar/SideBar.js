import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Dashboard from '@mui/icons-material/Dashboard'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LocalShipping from '@mui/icons-material/LocalShipping';
import LocalOffer from '@mui/icons-material/LocalOffer';
import Settings from '@mui/icons-material/Settings';
import Store from '@mui/icons-material/Store';
import Diversity1 from '@mui/icons-material/Diversity1';
import Category from '@mui/icons-material/Category';
import MedicationLiquid from '@mui/icons-material/MedicationLiquid';
import { Avatar } from '@mui/material'
import { Outlet, NavLink } from 'react-router-dom';
import logo from '../../assets/logo.jpeg'
import { AccountPopover } from "../NavBar/accountPopover";
import { usePopover } from "../NavBar/usePopover";
import { GridView } from '@mui/icons-material';
import { ContactMail } from '@mui/icons-material';
import style from './SideBar.module.css'
import { useLocation } from 'react-router-dom';
const drawerWidth = 240;
const icons = [<GridView />, <LocalShipping />, <Store />, <LocalOffer />, <ContactMail />, <Diversity1 />, <Category />, <MedicationLiquid />];
const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        color: 'red',
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function SideBar() {
    const location = useLocation();
    const accountPopover = usePopover();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
    React.useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const sidebarItems = [
        ['dashboard/overview', 'Dashboard',],
        ['dashboard/orders', 'orders List',],
        ['dashboard/products', 'Product Store',],
        ['dashboard/offers', 'Offers',],
        ['dashboard/testimonials', 'Testimonials',],
        ['dashboard/users', 'Users',],
        ['dashboard/categories', 'Categories',],
        ['dashboard/consultation', 'Consultation Package',]

    ]

    return (
        <>
            <Box>
                <CssBaseline />
                <AppBar position="fixed" open={open} sx={{ backgroundColor: 'white' }}>
                    <Toolbar sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex' }}>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                sx={{
                                    marginRight: 5,
                                    ...(open && { display: 'none' }),
                                }}
                            >
                                <Dashboard sx={{ color: 'gray' }} />
                            </IconButton >
                            <Avatar alt='Equilibre' src={logo} width={80}  sx={{
                                ...(open && { display: 'none' }),
                                '@media(width<500px)': {
                                    display: 'none',
                                }
                            }} />
                        </Box>
                        <Box component='nav' sx={{ display: 'flex' }}>
                            <Avatar
                                onClick={accountPopover.handleOpen}
                                ref={accountPopover.anchorRef}
                                sx={{
                                    cursor: 'pointer',
                                    height: 40,
                                    width: 40,
                                    marginLeft: 1.5
                                }}

                            />
                        </Box>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open} sx={{

                    ...(!open && {
                        '@media(width<500px)': {
                            display: 'none'
                        }
                    })
                }}>
                    <DrawerHeader>
                        <img alt='Equilibre' src={logo} width={80} lazy />
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>

                    </DrawerHeader>

                    <Divider />
                    <List>

                        {sidebarItems.map((text, index) => (
                            <ListItem key={text[0]} disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    className={{
                                        [style.active]: location.pathname === `/${text[0]}`,
                                        [style.notActive]: location.pathname !== `/${text[0]}`,
                                    }}

                                    component={NavLink}
                                    to={`/${text[0]}`}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        p: 2.5,
                                        borderLeft: '4px solid transparent',
                                    }}

                                >

                                    {/* add icons  */}

                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                            color: '#00000'
                                        }}
                                    >
                                        {icons[index]}
                                    </ListItemIcon>
                                    <ListItemText primary={text[1]} sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>

                </Drawer>
                <AccountPopover
                    anchorEl={accountPopover.anchorRef.current}
                    open={accountPopover.open}
                    onClose={accountPopover.handleClose}
                />
            </Box>
            <Outlet />
        </>
    );
}
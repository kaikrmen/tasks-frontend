'use client';

import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import AuthButton from '../tasks/authButton';

interface NavItem {
    name: string;
    href: string;
}

const alwaysVisibleNavItems: NavItem[] = [
    {
        name: 'Home',
        href: '/',
    },
    // {
    //     name: 'Public',
    //     href: '/public',
    // },
];

const authRequiredNavItems: NavItem[] = [
    // {
    //     name: 'Private',
    //     href: '/private',
    // },
    {
        name: 'Tasks',
        href: '/tasks',
    },
];

export default function Navbar() {
    const pathname = usePathname();
    const { user, isLoading } = useUser();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState<null | HTMLElement>(null);

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setMobileMenuAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMenuAnchorEl(null);
    };

    // Estilo para botón activo
    const activeButtonStyle = {
        color: 'white', // Color del texto
        fontWeight: 'bold',
        textDecoration: 'none',
        backgroundColor: 'rgba(255, 255, 255, 0.2)', // Fondo opaco/gris para el botón activo
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.25)', // Un poco más claro al pasar el mouse
        },
    };

    return (
        <AppBar position="static">
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                {isMobile ? (
                    <>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={handleMobileMenuOpen}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            anchorEl={mobileMenuAnchorEl}
                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                            open={Boolean(mobileMenuAnchorEl)}
                            onClose={handleMobileMenuClose}
                        >
                            {[
                                ...alwaysVisibleNavItems,
                                ...(user ? authRequiredNavItems : []),
                            ].map((item: NavItem) => (
                                <MenuItem key={item.href} onClick={handleMobileMenuClose}>
                                    <Link href={item.href} passHref>
                                        <Button sx={ { color: 'black', fontWeight: 'bold', textDecoration: 'none' }}>
                                            {item.name}
                                        </Button>
                                    </Link>
                                </MenuItem>
                            ))}
                            <MenuItem onClick={handleMobileMenuClose}>
                            <AuthButton />
                            </MenuItem>
                        </Menu>
                    </>
                ) : (
                    <>
                        <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing(2) }}>
                            {[...alwaysVisibleNavItems, ...(user ? authRequiredNavItems : [])].map((item: NavItem) => (
                                <Link key={item.href} href={item.href} passHref>
                                    <Button sx={pathname === item.href ? activeButtonStyle : { color: 'white', fontWeight: 'bold', textDecoration: 'none' }}>
                                        {item.name}
                                    </Button>
                                </Link>
                            ))}
                        </div>
                        <AuthButton />
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
}

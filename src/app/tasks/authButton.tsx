import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import Button from '@mui/material/Button';

export default function AuthButton() {
    const { user, isLoading } = useUser();

    return user ? (
        <a href={`/api/auth/logout`}>
            <Button sx={{ color: 'white', fontWeight: 'bold', textDecoration: 'none' }}>
                Logout
            </Button>
        </a>

    ) : (
        <Link href="/api/auth/login" >
            <Button sx={{ color: 'white', fontWeight: 'bold', textDecoration: 'none' }}>
                Login
            </Button>
        </Link>
    );
}

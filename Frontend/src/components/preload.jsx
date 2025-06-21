import { LogoIcon } from './sign in/CustomIcons.tsx';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Preload() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 9999,
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
            }}
        >
            <LogoIcon />
            <CircularProgress />
        </Box>
    );
}
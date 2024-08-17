import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (

        <Box
            sx={{
                width: '100%',
                height: '60px',
                backgroundColor: '#bd3233',
                color: 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'fixed',
                bottom: 0,
                left: 0,
            }}
        >
            <Typography variant="body2" component="p">
                ©  تمام حقوق اين وب‌سايت برای شرکت blackstudio است.
            </Typography>
        </Box>
    );
};

export default Footer;

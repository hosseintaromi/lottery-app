import { Box, Stack } from '@mui/material';


const Navbar = () => {
    return (
        <Stack direction="row" padding="10px">
            <Box
                component="img"
                src={"/logo.webp"}// The logo variable should be defined elsewhere
                sx={{ width: 50, height: 50 }}
            />
        </Stack>
    );
};

export default Navbar;

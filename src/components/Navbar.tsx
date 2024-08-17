import {Box, Stack} from '@mui/material';
import logo from "../assets/logo.webp"

const Navbar = () => {
    return (
        <Stack direction="row" padding="10px">
            <Box
                component="img"
                src= {logo}// The logo variable should be defined elsewhere
                sx={{ width: 50, height: 50 }}
            />
        </Stack>
    );
};

export default Navbar;

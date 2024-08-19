import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";



const Layout = () => {

    return (
        <>
            {/*<Navbar />*/}
            <Box margin={"20px"}>
                <Outlet />
            </Box>
            {/*<Footer />*/}

        </>
    );
}
export default Layout;
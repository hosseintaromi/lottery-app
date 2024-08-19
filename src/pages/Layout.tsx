import Navbar from "../components/Navbar.tsx";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer.tsx";



const Layout = () => {

    return (
        <>
            <Navbar />
            <Box margin={"20px"}>
                <Outlet />
            </Box>
            <Footer />

        </>
    );
}
export default Layout;
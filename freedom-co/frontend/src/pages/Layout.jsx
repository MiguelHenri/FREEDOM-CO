import { Flex, Box } from "@mantine/core";
import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

function Layout() {

    return (
        <Flex h="100vh" direction="column" justify='flex-start'>
            <Header/>

            <Box style={{flex:1}}> 
                <Outlet/>
            </Box>

            <Footer/>
        </Flex>
    );
}

export default Layout
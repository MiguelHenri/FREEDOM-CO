import {Flex} from "@mantine/core";
import {Outlet} from "react-router-dom";
import Header from "../components/layout/Header";

function Layout() {

    return (
        <Flex h="100vh" direction="column" justify='flex-start'>
            <Header/>

            <Outlet/>
        </Flex>
    );
}

export default Layout
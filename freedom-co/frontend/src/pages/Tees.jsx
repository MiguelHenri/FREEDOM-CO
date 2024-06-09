import { Paper, Text, Box } from "@mantine/core";
import StoreItemRow from "../components/StoreItemRow";

function Tees() {
    return(
        <>
        <Paper shadow='sm' radius='xs' ml='20px' mr='20px' p='md' withBorder>
            <Text ta='center' fz="25px" ff="'Lilita One', sans-serif">
                TEES & SHIRTS 
            </Text>
        </Paper>

        <Box p='md' style={{flex:1}}>
            <StoreItemRow/>
        </Box>
        </>
    );
}

export default Tees;
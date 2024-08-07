import { Paper, Text, Box } from "@mantine/core";
import StoreItemRow from "../../components/StoreItemRow";

function Accessories() {
    return(
        <>
        <Paper shadow='sm' radius='xs' ml='20px' mr='20px' p='md' withBorder mt='md'>
            <Text ta='center' fz="25px" ff="'Lilita One', sans-serif">
                ACCESSORIES
            </Text>
        </Paper>
        
        <Box p='md' style={{flex:1}}>
            <StoreItemRow filter='accessories'/>
        </Box>
        </>
    );
}

export default Accessories;
import { Paper, Text, Box } from "@mantine/core";
import StoreItemRow from "../../components/StoreItemRow";

function Pants() {
    return(
        <>
        <Paper shadow='sm' radius='xs' ml='20px' mr='20px' p='md' withBorder>
            <Text ta='center' fz="25px" ff="'Lilita One', sans-serif">
                PANTS 
            </Text>
        </Paper>

        <Box p='md' style={{flex:1}}>
            <StoreItemRow filter='pants'/>
        </Box>
        </>
    );
}

export default Pants;
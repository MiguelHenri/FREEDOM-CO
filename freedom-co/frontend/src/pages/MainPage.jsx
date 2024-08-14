import { Box, Paper, Text, Image, Center } from '@mantine/core'
import StoreItemRow from '../components/StoreItemRow';

function MainPage() {

    return (
        <>
        <Center>
            <Image
                src='https://www.jeffreyscafe.ca/wp-content/uploads/2016/01/banner-placeholder.png'
                alt='FREEDOM&CO'
                h={{base: '200px', sm: '400px'}}
            />
        </Center>

        <Box p='md' style={{flex:1}}>        
            <Paper shadow='sm' radius='xs' mb='20px' p='md' withBorder>
                <Text ta='center' fz="25px" ff="'Lilita One', sans-serif">
                    NEW STUFF 
                </Text>
            </Paper>

            <StoreItemRow filter='new'/>

            <Paper shadow='sm' radius='xs' mt='20px' mb='20px' p='md' withBorder>
                <Text ta='center' fz="25px" ff="'Lilita One', sans-serif">
                    ON SALE 
                </Text>
            </Paper>

            <StoreItemRow filter='sale'/>
        </Box>

        </>
    );
}

export default MainPage;
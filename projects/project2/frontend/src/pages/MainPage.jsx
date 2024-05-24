import { Box, Paper, Text, Image, Center } from '@mantine/core'
import StoreItemRow from '../components/StoreItemRow';

function MainPage() {

    return (
        <>
        <Center>
            <Image
                src='https://www.jeffreyscafe.ca/wp-content/uploads/2016/01/banner-placeholder.png'
                alt='FREEDOM&CO'
            />
        </Center>

        <Box p='md' style={{flex:1}}>        
            <Paper shadow='sm' radius='xs' mb='20px' p='md' withBorder>
                <Text ta='center' fz="20px" fw={700}>
                    NEW STUFF 
                </Text>
            </Paper>

            <StoreItemRow lancamento/>

            <Paper shadow='sm' radius='xs' mt='20px' mb='20px' p='md' withBorder>
                <Text ta='center' fz="20px" fw={700}>
                    BEST SELLERS 
                </Text>
            </Paper>

            <StoreItemRow />
        </Box>

        </>
    );
}

export default MainPage;
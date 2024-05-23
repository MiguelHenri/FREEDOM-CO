import { Paper, Text } from '@mantine/core'
import StoreItemRow from '../components/StoreItemRow';

function MainPage() {

    return (
        <>
        <Text ta='center' style={{fontFamily: 'cursive'}} fz='20px' mb='20px'>
            Keep free. Enjoy the streetwear world. 
        </Text>

        <Paper shadow='sm' radius='xs' mb='20px' p='md' withBorder>
            <Text ta='center' fz="20px" fw={700}>
                LANÇAMENTOS 
            </Text>
        </Paper>

        <StoreItemRow lancamento/>

        <Paper shadow='sm' radius='xs' mt='20px' mb='20px' p='md' withBorder>
            <Text ta='center' fz="20px" fw={700}>
                MAIS COMPRADOS 
            </Text>
        </Paper>

        <StoreItemRow />

        </>
    );
}

export default MainPage;
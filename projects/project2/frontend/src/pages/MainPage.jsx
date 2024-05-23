import { Center, Paper, Text } from '@mantine/core'

function MainPage() {
    return (
        <>
        <Text ta='center' style={{fontFamily: 'cursive'}} fz='20px' mb='20px'>
            Keep free. Enjoy the streetwear world. 
        </Text>

        <Paper shadow='sm' radius='xs' mb='20px' p='md'>
            <Text ta='center' fz="20px">
                LANÇAMENTOS 
            </Text>
        </Paper>

        <Paper shadow='sm' radius='xs' mb='20px' p='md'>
            <Text ta='center' fz="20px">
                MAIS COMPRADOS 
            </Text>
        </Paper>

        </>
    );
}

export default MainPage;
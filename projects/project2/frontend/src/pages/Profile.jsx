import { Paper, Button, Stack, Text } from "@mantine/core";

function Profile() {
    
    return (
        <>
        <Stack align='center' p='20px'>
            <Paper shadow="sm" withBorder p='lg' radius='md'>
                <Text fw={700} fz='20px'>
                    PROFILE
                </Text>
            </Paper>
            <Button 
                w={{base: '70vw', sm: '50vw', md: '40vw', lg:'30vw'}}
                size='md'
                variant='outline'
            >
                INFORMATIONS
            </Button>
            <Button 
                w={{base: '70vw', sm: '50vw', md: '40vw', lg:'30vw'}} 
                size='md'
                variant='outline'
            >
                PURCHASES
            </Button>
        </Stack>
        </>
    );
}

export default Profile;
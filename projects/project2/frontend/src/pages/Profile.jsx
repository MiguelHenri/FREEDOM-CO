import { Box, Button, Stack } from "@mantine/core";

function Profile() {
    
    return (
        <>
        <Box p='md' style={{flex:1}}>
            <Stack align='center'>
                <Button w='70vh' size='md'>
                    MY INFORMATIONS
                </Button>
                <Button w='70vh' size='md'>
                    MY PURCHASES
                </Button>
            </Stack>
        </Box>
        </>
    );
}

export default Profile;
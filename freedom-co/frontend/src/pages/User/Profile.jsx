import { Paper, Button, Stack, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";

function Profile() {
    const navigate = useNavigate();

    // todo add purchases page (major)
    // todo add informations such as address etc page (major)

    const { userName, clearAuth } = useAuth() || { userName: '' };

    const logOut = () => {
        console.log('logging out...')

        clearAuth();
        notifications.show({message: 'Logged out successfuly'});
        navigate('/login');
    }
    
    return (
        <>
        <Stack align='center' p='20px'>
            <Paper shadow="sm" withBorder p='lg' radius='md'>
                <Text fw={700} fz='20px'>
                    PROFILE
                </Text>
            </Paper>
            <Text>Hi {userName}!</Text>
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
            <Button 
                w={{base: '70vw', sm: '50vw', md: '40vw', lg:'30vw'}} 
                size='md'
                variant='outline'
                color='red'
                onClick={logOut}
            >
                LOG OUT
            </Button>
        </Stack>
        </>
    );
}

export default Profile;
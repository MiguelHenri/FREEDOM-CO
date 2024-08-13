import { Paper, Button, Stack, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";

function Profile() {
    const navigate = useNavigate();

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
            <Paper shadow="sm" withBorder p='md' radius='md'>
                <Text fz='25px' ff="'Lilita One', sans-serif">
                    PROFILE
                </Text>
            </Paper>
            <Text>Hi {userName}!</Text>
            <Button 
                w={{base: '70vw', sm: '50vw', md: '40vw', lg:'30vw'}}
                size='md'
                variant='outline'
                onClick={() => navigate('/informations')}
            >
                SHIPPING INFORMATIONS
            </Button>
            <Button 
                w={{base: '70vw', sm: '50vw', md: '40vw', lg:'30vw'}} 
                size='md'
                variant='outline'
                onClick={() => navigate('/purchases')}
            >
                PURCHASE HISTORY
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
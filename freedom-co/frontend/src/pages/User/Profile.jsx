import { Paper, Button, Stack, Text } from "@mantine/core";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";

function Profile() {
    const navigate = useNavigate();

    const { userName, clearAuth } = useAuth() || { userName: '' };

    const logOut = () => {
        console.log('logging out...')

        // Requesting backend logout api
        axios.post('api/users/logout')
            .then(_ => {
                clearAuth();
                navigate('/login');
                alert('Logged out successfuly');
            })
            .catch(err => {
                console.error('Unhandled error when logging out.', err);
                alert('Failed to logout.');
            });
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
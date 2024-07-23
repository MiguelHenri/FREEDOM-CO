import { Button, Stack, TextInput, Text, Paper, Anchor, PasswordInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import { useAuth } from "../../contexts/useAuth";

function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { saveLogin } = useAuth(); 

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            username: '',
            password: '',
        },
        validate: {
            username: isNotEmpty('Username is required.'),
            password: isNotEmpty('Password is required'),
        },
    });

    function onSubmit(values) {
        // Requesting backend login api
        setLoading(true);
        axios.post('api/users/login', values)
            .then(res => {
                const { token } = res.data;
                saveLogin(values.username, token);
                navigate('/profile');
                alert('Logged in successfully');
            })
            .catch(err => {
                setLoading(false);
                console.error('Unhandled error when logging in.', err);
                if (err.response.data.message) {
                    setError(err.response.data.message);
                } else {
                    setError('An unknown error occurred.');
                }
            });
    }

    return (
        <Stack 
            align='center'
            justify='center' 
            p='20px' 
            component={'form'}
            onSubmit={form.onSubmit(onSubmit)}
        >
            <Paper shadow="sm" withBorder p='md' radius='md'>
                <Text fz='25px' ff="'Lilita One', sans-serif">
                    LOGIN
                </Text>
            </Paper>
            <TextInput
                withAsterisk
                label="Username"
                placeholder="Your Username"
                {...form.getInputProps('username')}
            />
            <PasswordInput
                withAsterisk
                label="Password"
                placeholder="**********"
                {...form.getInputProps('password')}
            />
            {error && <Text c='red'>{error}</Text>}
            <Button
                variant='outline'
                size='md'
                type='submit'
                loading={loading}
            >
                LOG IN
            </Button>
            <Text>
                You don't have an account yet?{' '}
                <Anchor component={HashLink} to='/signup'>
                    Sign up here
                </Anchor>.
            </Text>
        </Stack>
    );
}

export default Login;
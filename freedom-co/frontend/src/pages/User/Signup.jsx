import { Button, Stack, TextInput, Text, Paper, PasswordInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            username: '',
            email: '',
            password: '',
            passwordCheck: '',
        },
        validate: {
            username: isNotEmpty('Username is required.'),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email is required.'),
            password: isNotEmpty('Password is required.'),
            passwordCheck: (value, values) =>
                (value !== values.password || value == '') ? 
                'Password confirmation differs.' : null,
        },
    });

    function onSubmit(values) {
        console.log(values);
        
        // Requesting backend signup api
        setLoading(true);
        setError('');
        axios.post('api/users/signup', values)
            .then(_ => {
                navigate('/profile');
                alert('Account created successfully.');
            })
            .catch(err => {
                setLoading(false);
                console.error('Unhandled error when creating accout.', err);
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
                    SIGN UP
                </Text>
            </Paper>
            <TextInput
                withAsterisk
                label="Username"
                placeholder="Your Username"
                {...form.getInputProps('username')}
            />
            <TextInput
                withAsterisk
                label="Email"
                placeholder="your@email.com"
                {...form.getInputProps('email')}
            />
            <PasswordInput
                withAsterisk
                label="Password"
                placeholder="**********"
                {...form.getInputProps('password')}
            />
            <PasswordInput
                withAsterisk
                label="Password Confirmation"
                placeholder="**********"
                {...form.getInputProps('passwordCheck')}
            />
            {error && <Text c='red'>{error}</Text>}
            <Button
                variant='outline'
                size='md'
                type='submit'
                loading={loading}
            >
                SIGN UP
            </Button>
        </Stack>
    );
}

export default Signup;
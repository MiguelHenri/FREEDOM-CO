import { Button, Stack, TextInput, Text, Paper, Anchor, PasswordInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { HashLink } from 'react-router-hash-link';

function Login() {

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
        // TODO: request backend login api
        console.log(values);
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
            <Button
                variant='outline'
                size='md'
                type='submit'
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
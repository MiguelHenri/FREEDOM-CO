import { Button, Stack, TextInput, Text, Paper, Anchor } from "@mantine/core";
import { useForm } from "@mantine/form";
import { HashLink } from 'react-router-hash-link';

function Login() {

    const form = useForm({
        mode: 'uncontrolled',
    
        validate: {
            username: (value) => (value.length > 0 ? null : 'Username is required.'),
            password: (value) => (value.length > 0 ? null : 'Password is required.'),
        },
    });

    function onSubmit(values) {
        // TODO: request backend login api
        console.log(values);
    }

    const inputProps = {
        size: 'md',
        w: {base: '70vw', sm: '50vw', md: '40vw', lg:'30vw'},
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
                {...inputProps}
                {...form.getInputProps('email')}
            />
            <TextInput
                withAsterisk
                label="Password"
                placeholder="**********"
                {...inputProps}
                {...form.getInputProps('password')}
            />
            <Button
                variant='outline'
                size='md'
                component={HashLink}
                to='/profile'
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
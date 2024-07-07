import { Button, Stack, TextInput, Text, Paper } from "@mantine/core";
import { useForm } from "@mantine/form";
import { HashLink } from 'react-router-hash-link';

function Signup() {

    const form = useForm({
        mode: 'uncontrolled',
    
        validate: {
            username: (value) => (value.length > 0 ? null : 'Username is required.'),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email is required.'),
            password: (value) => (value.length > 0 ? null : 'Password is required.'),
            passwordCheck: (value) => (value.length > 0 ? null : 'Password confirmation is required.'),
        },
    });

    function onSubmit(values) {
        // TODO: request backend signup api
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
                    SIGN UP
                </Text>
            </Paper>
            <TextInput
                withAsterisk
                label="Username"
                placeholder="Your Username"
                {...inputProps}
                {...form.getInputProps('username')}
            />
            <TextInput
                withAsterisk
                label="Email"
                placeholder="your@email.com"
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
            <TextInput
                withAsterisk
                label="Password Confirmation"
                placeholder="**********"
                {...inputProps}
                {...form.getInputProps('passwordCheck')}
            />
            <Button
                variant='outline'
                size='md'
                component={HashLink}
                to='/profile'
            >
                SIGN UP
            </Button>
        </Stack>
    );
}

export default Signup;
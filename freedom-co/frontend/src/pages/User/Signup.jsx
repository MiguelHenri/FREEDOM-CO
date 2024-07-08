import { Button, Stack, TextInput, Text, Paper, PasswordInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";

function Signup() {

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
        // TODO: request backend signup api
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
            <Button
                variant='outline'
                size='md'
                type='submit'
            >
                SIGN UP
            </Button>
        </Stack>
    );
}

export default Signup;
import { Button, Stack, TextInput, Text, Paper } from "@mantine/core";
import { useForm } from "@mantine/form";
import { HashLink } from 'react-router-hash-link';

function Login() {

    const form = useForm({
        mode: 'uncontrolled',
    
        validate: {
          email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email é obrigatório.'),
          password: (value) => (value.length > 0 ? null : 'Senha é obrigatória.'),
        },
    });

    function onSubmit(values) {
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
                label="Email"
                placeholder="your@email.com"
                {...inputProps}
                {...form.getInputProps('email')}
            />
            <TextInput
                withAsterisk
                label="Password"
                placeholder="your-password"
                {...inputProps}
                {...form.getInputProps('password')}
            />
            <Button
                variant='outline'
                size='md'
                component={HashLink}
                to='/profile'
            >
                LOG IN NOW
            </Button>
        </Stack>
    );
}

export default Login;
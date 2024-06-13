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

    return (
        <Stack align='center' p='20px'>
            <Paper shadow="sm" withBorder p='md' radius='md'>
                <Text fz='25px' ff="'Lilita One', sans-serif">
                    LOGIN
                </Text>
            </Paper>
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
                <TextInput
                    mb='20px'
                    withAsterisk
                    label="Email"
                    placeholder="your@email.com"
                    {...form.getInputProps('email')}
                />

                <TextInput
                    mb='20px'
                    withAsterisk
                    label="Password"
                    placeholder="your-password"
                    {...form.getInputProps('password')}
                />

                <Button
                    w={{base: '70vw', sm: '50vw', md: '40vw', lg:'30vw'}} 
                    size='md'
                    variant='outline'
                    component={HashLink}
                    to='/profile'
                >
                    LOG IN NOW
                </Button>

            </form>
        </Stack>
    );
}

export default Login;
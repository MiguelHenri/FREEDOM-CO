import { createTheme, PasswordInput } from "@mantine/core";

export default createTheme({
    colors: {
        primary: ['#f2f2f2'],
        secondary: ['#0b59de'],
        tertiary: ['#b38144'],
    },
    primaryColor: 'primary',
    secondaryColor: 'secondary',
    tertiaryColor: 'tertiary',

    components: {
        Anchor: {
            defaultProps: {
                c: 'secondary.0'
            }
        },
        Button: {
            defaultProps: {
                color: 'secondary.0',
                variant: 'outline',
            }
        },
        TextInput: {
            defaultProps: {
                size: 'md',
                w: {base: '70vw', sm: '50vw', md: '40vw', lg:'30vw'},
            }
        },
        NativeSelect: {
            defaultProps: {
                size: 'md',
                w: {base: '70vw', sm: '50vw', md: '40vw', lg:'30vw'},
            }
        },
        NumberInput: {
            defaultProps: {
                size: 'md',
                w: {base: '70vw', sm: '50vw', md: '40vw', lg:'30vw'},
            }
        },
        PasswordInput: {
            defaultProps: {
                size: 'md',
                w: {base: '70vw', sm: '50vw', md: '40vw', lg:'30vw'},
            }
        }
    }
});
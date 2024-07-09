import { createTheme } from "@mantine/core";

const theme = createTheme({
    colors: {
        primary: ['#f2f2f2'],
        secondary: ['#0b59de'],
        tertiary: ['#b38144'],
    },

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
                w: {base: '80vw', xs: '65vw', sm: '50vw', md: '40vw', lg:'30vw'},
            }
        },
        NativeSelect: {
            defaultProps: {
                size: 'md',
                w: {base: '80vw', xs: '65vw', sm: '50vw', md: '40vw', lg:'30vw'},
            }
        },
        NumberInput: {
            defaultProps: {
                size: 'md',
                w: {base: '80vw', xs: '65vw', sm: '50vw', md: '40vw', lg:'30vw'},
            }
        },
        PasswordInput: {
            defaultProps: {
                size: 'md',
                w: {base: '80vw', xs: '65vw', sm: '50vw', md: '40vw', lg:'30vw'},
            }
        }
    }
});

export default theme;
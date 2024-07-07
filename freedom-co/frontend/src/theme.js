import { createTheme } from "@mantine/core";

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
    }
});
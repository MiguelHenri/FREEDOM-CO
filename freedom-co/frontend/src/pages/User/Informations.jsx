import { Stack, Text, Paper, TextInput, Button } from "@mantine/core"
import { useAuth } from "../../contexts/useAuth";

function Informations() {
    const { token } = useAuth();

    // todo add form

    // todo request database data

    return (
        <Stack p='20px' align='center'>
            <Paper shadow="sm" withBorder p='md' radius='md'>
                <Text fz='25px' ff="'Lilita One', sans-serif">
                    INFORMATIONS
                </Text>
            </Paper>
            <TextInput
                withAsterisk
                label="Address line 1"
            />
            <TextInput
                label="Address line 2"
            />
            <TextInput
                withAsterisk
                label="City"
            />
            <TextInput
                withAsterisk
                label="State"
            />
            <TextInput
                withAsterisk
                label="Country"
            />
            <TextInput
                withAsterisk
                label="ZIP / Postcode"
            />
            <Button
                variant='outline'
                size='md'
            >
                SAVE
            </Button>
        </Stack>
    )
}

export default Informations;
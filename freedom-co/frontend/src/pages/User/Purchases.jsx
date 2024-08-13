import { Stack, Text, Paper } from "@mantine/core"
import { useAuth } from "../../contexts/useAuth";

function Purchases() {
    const { token } = useAuth();

    return (
        <Stack p='20px' align='center'>
            <Paper shadow="sm" withBorder p='md' radius='md'>
                <Text fz='25px' ff="'Lilita One', sans-serif">
                    PURCHASES
                </Text>
            </Paper>
        </Stack>
    )
}

export default Purchases;
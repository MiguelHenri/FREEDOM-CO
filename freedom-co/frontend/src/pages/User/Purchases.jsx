import { Stack, Text, Paper } from "@mantine/core"
import { useAuth } from "../../contexts/useAuth";
import { useEffect } from "react";
import axios from "axios";

function Purchases() {
    const { token } = useAuth();

    useEffect(() => {
        axios.get('/api/purchases', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.error(err);
            })
    }, [])

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
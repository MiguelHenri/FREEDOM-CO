import { Stack, Text, Paper, Card, Group, LoadingOverlay } from "@mantine/core"
import { useAuth } from "../../contexts/useAuth";
import { useEffect, useState } from "react";
import axios from "axios";
import { notifications } from "@mantine/notifications";

function Purchases() {
    const { token } = useAuth();
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get('/api/purchases', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(res => {
                setPurchases(res.data);
            })
            .catch(err => {
                if (err.response.data.message) {
                    notifications.show({message: err.response.data.message, color: 'red'})
                }
                console.error(err);
            })
            .finally(() => setLoading(false));
    }, [token])

    return (
        <Stack p='20px' align='center'>
            <Paper shadow="sm" withBorder p='md' radius='md'>
                <Text fz='25px' ff="'Lilita One', sans-serif">
                    PURCHASES
                </Text>
            </Paper>
            <LoadingOverlay visible={loading}/>
            {purchases
            .sort((a, b) => new Date(b.expires_at) - new Date(a.expires_at))
            .map((purchase, index) => (
            <Card key={index} shadow="sm" radius="md" withBorder 
                w={{base:'90vw', sm:'70vw', md:'60vw', lg:'50vw', xl:'35vw'}}
                href={`/purchases/${purchase.id}`} component='a'
            >
                <Group justify='space-evenly' align='center'>
                    <Text>
                        {new Date(purchase.expires_at).toLocaleDateString('pt-BR')}
                    </Text>
                    <Text>
                        Purchase {purchase.status}
                    </Text>
                    <Text fw={700}>
                        TOTAL: ${purchase.value}
                    </Text>
                </Group>
            </Card>
            ))}
        </Stack>
    )
}

export default Purchases;
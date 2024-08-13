import { Text, Stack, Paper, LoadingOverlay, Table, TableTr } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";

function PurchasePage() {
    const { id } = useParams();
    const [purchase, setPurchase] = useState([]);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const { token } = useAuth();

    useEffect(() => {
        setLoading(true);
        axios.get(`/api/purchases/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(res => {
                setPurchase(res.data);
                // Creating items rows
                let items = res.data.items.map((item) => (
                    <TableTr key={item.id}>
                        <Table.Td>{item.title}</Table.Td>
                        <Table.Td>{item.size}</Table.Td>
                        <Table.Td>{item.quantity}</Table.Td>
                        <Table.Td>{item.value}</Table.Td>
                    </TableTr>
                ));
                setItems(items);
            })
            .catch(err => {
                notifications.show({message: 'Unhandled error when fetching purchase.', color: 'red'})
                console.error(err);
            })
            .finally(() => setLoading(false));
    }, [id, token]);

    return (
        <Stack p='20px' align='center'>
            <LoadingOverlay visible={loading}/>
            <Paper shadow="sm" withBorder p='md' radius='md'>
                <Text fz='25px' ff="'Lilita One', sans-serif">
                    PURCHASE
                </Text>
            </Paper>
            <Text fw={700}>
                {new Date(purchase.expires_at).toLocaleDateString('pt-BR')} - {purchase.status}
            </Text>
            <Table striped w={{base: '95vw', sm: '90vw', md:'80vw', lg:'75vw', xl:'70vw'}}>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Name</Table.Th>
                        <Table.Th>Size</Table.Th>
                        <Table.Th>Quantity</Table.Th>
                        <Table.Th>Value</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{items}</Table.Tbody>
                <Table.Tfoot>
                    <Table.Tr>
                        <Table.Th></Table.Th>
                        <Table.Th></Table.Th>
                        <Table.Th>Total: </Table.Th>
                        <Table.Th>{purchase.value}</Table.Th>
                    </Table.Tr>
                </Table.Tfoot>
            </Table>
        </Stack>
    )
}

export default PurchasePage;
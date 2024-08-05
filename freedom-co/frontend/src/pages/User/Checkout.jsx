import { Stack, Paper, Text, SegmentedControl, Button, 
        CopyButton, Tooltip, ActionIcon, Group, Table,
        TableTr} from "@mantine/core";
import { IconCopy, IconCheck } from '@tabler/icons-react';
import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/useAuth";
import { QRCodeCanvas } from 'qrcode.react';
import { notifications } from "@mantine/notifications";

function Checkout() {
    const [mode, setMode] = useState('pix');
    const [pixPayload, setPixPayload] = useState(localStorage.getItem('PixPayload') || '');
    const { token } = useAuth();
    const [cartItems, setCartItems] = useState([]);
    const [totalVal, setTotalVal] = useState('');

    // todo confirm/store shipping address (major)

    useEffect(() => {
        // Requesting Cart backend API
        axios.get('/api/carts', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(res => {
                let items = res.data;
                // Calculating total value
                let total = items.reduce((total, item) => {
                    let numbers = item.value.match(/\d+(?:[.,]\d+)?/g)
                                        .map(num => parseFloat(num.replace(',', '.')));
                    
                    let sum = numbers.reduce((acc, num) => acc + num, 0);
                  
                    return total + (sum * item.quantity);
                }, 0);
                setTotalVal('$' + total.toFixed(2));
                // Creating items rows
                items = items.map((item) => (
                    <TableTr key={item.id}>
                        <Table.Td>{item.title}</Table.Td>
                        <Table.Td>{item.size}</Table.Td>
                        <Table.Td>{item.quantity}</Table.Td>
                        <Table.Td>{item.value}</Table.Td>
                    </TableTr>
                ));
                setCartItems(items);
            })
            .catch(err => {
                console.error('Error fetching items.', err);
            });
    }, [token]);

    const generatePixCode = () => {
        if (pixPayload) return; // will not generate more than once

        // Requesting checkout backend API
        axios.get('/api/carts/checkout', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(res => {
                let temp = res.data.payload;
                setPixPayload(temp);
                localStorage.setItem('PixPayload', temp);
            })
            .catch(err => {
                notifications.show({message: 'Error fetching pix payload.', color: 'red'});
                console.error('Error fetching pix payload.', err);
            })
    }

    return (
        <Stack p='20px' align='center'>
            <Paper shadow="sm" withBorder p='md' radius='md'>
                <Text fz='25px' ff="'Lilita One', sans-serif">
                    CHECKOUT
                </Text>
            </Paper>
            <SegmentedControl
                data={[
                    {label: 'Pix', value: 'pix'},
                    {label: 'Credit/Debit Card', value: 'card', disabled: true},
                ]}
                size='md'
                value={mode}
                onChange={setMode}
            />
            <Table striped w={{base: '95vw', sm: '90vw', md:'80vw', lg:'75vw', xl:'70vw'}}>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Name</Table.Th>
                        <Table.Th>Size</Table.Th>
                        <Table.Th>Quantity</Table.Th>
                        <Table.Th>Value</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{cartItems}</Table.Tbody>
                <Table.Tfoot>
                    <Table.Tr>
                        <Table.Th></Table.Th>
                        <Table.Th></Table.Th>
                        <Table.Th>Total: </Table.Th>
                        <Table.Th>{totalVal}</Table.Th>
                    </Table.Tr>
                </Table.Tfoot>
            </Table>
            {mode === 'pix' && (
                <>
                {!pixPayload && (
                <Button onClick={generatePixCode}>
                    Generate Pix Code
                </Button>
                )}

                {pixPayload && (
                <>
                <Text>
                    Scan the QR code or copy the Pix code below:
                </Text>
                <QRCodeCanvas value={pixPayload} size={256} />
                <Group align="center" justify="center">
                    <Text truncate='end' w={256}>
                        {pixPayload}
                    </Text>
                    <CopyButton value={pixPayload} timeout={3000}>
                    {({ copied, copy }) => (
                        <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                        <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
                            {copied ? (
                            <IconCheck />
                            ) : (
                            <IconCopy />
                            )}
                        </ActionIcon>
                        </Tooltip>
                    )}
                    </CopyButton>
                </Group>
                <Button onClick={() => localStorage.removeItem('PixPayload')}>
                    CONFIRM
                </Button>
                </>
                )}
                
                </>
            )}
        </Stack>
    )
}

export default Checkout;
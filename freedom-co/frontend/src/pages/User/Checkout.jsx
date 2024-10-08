import { Stack, Paper, Text, SegmentedControl, Button, 
        CopyButton, Tooltip, ActionIcon, Group, Table,
        TableTr} from "@mantine/core";
import { IconCopy, IconCheck } from '@tabler/icons-react';
import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/useAuth";
import { QRCodeCanvas } from 'qrcode.react';
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import Timer from "../../components/Timer";

function Checkout() {
    const [mode, setMode] = useState('pix');
    const [pixPayload, setPixPayload] = useState(localStorage.getItem('PixPayload') || '');
    const { token } = useAuth();
    const [cartItems, setCartItems] = useState([]);
    const [totalVal, setTotalVal] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Requesting Cart backend API
        axios.get('/api/carts', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(res => {
                let items = res.data;
                // Removing non reserved items
                if (pixPayload) items = items.filter(item => item.purchase_id !== null);
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
    }, [token, pixPayload]);

    const generatePixCode = () => {
        if (pixPayload) return; // will not generate more than once

        // Requesting checkout backend API
        setLoading(true);
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
                if (err.response.data.message) {
                    notifications.show({message: err.response.data.message, color: 'red'});
                } else {
                    notifications.show({message: 'Error fetching pix payload.', color: 'red'});
                }
                console.error('Error fetching pix payload.', err);
            })
            .finally(() => setLoading(false));
    }

    const handleClearCart = () => {
        // Requesting Cart API to clear
        setLoading(true);
        axios.delete('/api/carts/clear', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(res => {
                // Removing pix payload from local storage
                localStorage.removeItem('PixPayload');
                localStorage.removeItem('endTimestamp');
                setPixPayload('');
                console.log(res.data.message);
                notifications.show({message: 'Done! Your purchase is now confirmed.'});
                navigate('/profile');
            })
            .catch(err => {
                notifications.show({message: 'Error when confirming purchase.', color: 'red'});
                console.error('Unhandled error when confirming purchase.', err);
            })
            .finally(() => setLoading(false));
    };

    const onTimeUpPix = () => {
        // Removing pix payload from local storage
        localStorage.removeItem('PixPayload');
        setPixPayload('');
        notifications.show({message: 'Time is up! The payment can no longer be completed.', color: 'red'});
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
                <Button onClick={generatePixCode} loading={loading}>
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
                <Timer initialTime={600} onTimeUp={onTimeUpPix}/>
                <Button onClick={handleClearCart} loading={loading}>
                    CONFIRM TRANSACTION
                </Button>
                </>
                )}
                
                </>
            )}
        </Stack>
    )
}

export default Checkout;
import { Stack, Card, Group, Image, Text, Paper, Button, CloseButton, Anchor } from "@mantine/core";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/useAuth";
import { IconMinus, IconPlus, IconX } from '@tabler/icons-react';
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const { token } = useAuth();
    const [changed, setChanged] = useState(false);
    const navigate = useNavigate();
    const [totalVal, setTotalVal] = useState('');
    const [loadingButton, setLoadingButton] = useState(false);

    useEffect(() => {
        // Requesting Cart backend API
        axios.get('/api/carts', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(res => {
                // Setting items
                let items = res.data;
                setCartItems(items);
                // Calculating and setting total value
                let total = items.reduce((total, item) => {
                    let numbers = item.value.match(/\d+(?:[.,]\d+)?/g)
                                        .map(num => parseFloat(num.replace(',', '.')));
                    
                    let sum = numbers.reduce((acc, num) => acc + num, 0);
                  
                    return total + (sum * item.quantity);
                }, 0);
                setTotalVal('$' + total.toFixed(2));
            })
            .catch(err => {
                console.error('Error fetching items.', err);
            });
        setChanged(false);
    }, [token, changed]);

    const handleItemDelete = (item_id) => {
        // Requesting Cart API to delete item
        axios.delete(`/api/carts/${item_id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(res => {
                console.log(res.data.message);
                notifications.show({message: 'Item removed successfully.'});
                setChanged(true);
            })
            .catch(err => {
                notifications.show({message: 'Error when deleting item.', color: 'red'});
                console.error('Error when deleting item.', err);
            });
    }

    const handleItemAdd = (item_id, quantity, size) => {
        // Requesting Cart API to update item
        const data = { quantity: quantity + 1, size: size}
        axios.put(`/api/carts/${item_id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(res => {
                console.log(res.data.message);
                setChanged(true);
            })
            .catch(err => {
                notifications.show({message: err.response.data.message, color: 'red'});
                console.error('Error when updating item quantity.', err);
            });
    }

    const handleItemSubtract = (item_id, quantity, size) => {
        // Requesting Cart API to update item
        const data = { quantity: quantity - 1, size: size }
        console.log(data);
        axios.put(`/api/carts/${item_id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(res => {
                if (!res.data.cart_item) {
                    notifications.show({message: 'Item deleted from cart.'});
                }
                console.log(res.data.message);
                setChanged(true);
            })
            .catch(err => {
                notifications.show({message: 'Error when updating item quantity.', color: 'red'});
                console.error('Error when updating item quantity.', err);
            });
    }

    const tryCheckout = () => {
        if (cartItems.length === 0) return;

        setLoadingButton(true);
        // Checking if user has shipping address
        axios.get('/api/users', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(res => {
                if (res.data.address_line_1) {
                    // Ok, user has shipping address
                    navigate('/checkout');
                }
                else {
                    // User do not have shipping address
                    notifications.show({message: 'Please, submit shipping information.', color: 'yellow'});
                    navigate('/informations');
                }
            })
            .catch(err => {
                if (err.response.data.message) {
                    notifications.show({message: err.response.data.message, color: 'red'});
                }
                console.error('Unhandled error when trying checkout', err);
            })
            .finally(() => setLoadingButton(false));
    }

    return(
        <Stack p='20px' align='center'>
            <Paper shadow="sm" withBorder p='md' radius='md'>
                <Text fz='25px' ff="'Lilita One', sans-serif">
                    MY CART
                </Text>
            </Paper>
            {cartItems.map((item, index) => (
            <Card key={index} shadow="sm" radius="md" withBorder 
                w={{base:'90vw', sm:'70vw', md:'60vw', lg:'50vw', xl:'40vw'}}
            >
                <Group justify='space-evenly' align="center">
                    <Anchor href={`store/${item.item_id}`}>
                        <Image 
                            src={item.image} 
                            alt={item.title}
                            h='100px'
                            w='100px'
                        />
                    </Anchor>
                    <Text fw={500} fz='18px'>
                        {item.title}
                        <br/>
                        {'Size: ' + item.size}
                    </Text>
                    <Group wrap="nowrap">
                        <Button radius='xl' variant='transparent' mr='-20px'
                            onClick={() => handleItemSubtract(item.id, item.quantity, item.size)}
                        >
                            <IconMinus size={20}/>
                        </Button>
                        <Text fw={500} fz='18px'>
                            {item.quantity}
                        </Text>
                        <Button radius='xl' variant='transparent' ml='-20px'
                            onClick={() => handleItemAdd(item.id, item.quantity, item.size)}
                        >
                            <IconPlus size={20}/>
                        </Button>
                    </Group>
                    <Group wrap="nowrap">
                        <Text fw={500} fz='18px'>
                            {`$${item.quantity*(parseFloat(item.value.replace(/[^\d.,]/g, '').replace(',', '.')))}`}
                        </Text>
                        <CloseButton 
                            variant="transparent"
                            icon={<IconX/>}
                            onClick={() => handleItemDelete(item.id)}
                        />
                    </Group>
                </Group>
            </Card>
            ))}
            <Paper shadow="sm" withBorder p='20px' radius='md'>
                <Group justify="center">
                    <Text fw={700} fz='20px'>
                        TOTAL: {totalVal}
                    </Text>
                    <Button
                        variant='outline'
                        size='md'
                        disabled={cartItems.length === 0}
                        onClick={tryCheckout}

                    >
                        BUY
                    </Button>
                </Group>
            </Paper>
        </Stack>
    );
}

export default Cart
import { Stack, Card, Group, Image, Text, Paper, Button, CloseButton } from "@mantine/core";
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
                // Calculating total value
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

    // const handleClearCart = () => {
    //     // Requesting Cart API to clear
    //     axios.delete('/api/carts/clear', {
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //         }
    //     })
    //         .then(res => {
    //             console.log(res.data.message);
    //             notifications.show({message: 'The cart is now empty.'});
    //             setChanged(true);
    //         })
    //         .catch(err => {
    //             notifications.show({message: 'Error when clearing cart.', color: 'red'});
    //             console.error('Error when clearing cart.', err);
    //         });
    // };

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

    const handleItemAdd = (item_id, quantity) => {
        // Requesting Cart API to update item
        const data = { quantity: quantity + 1 }
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
                notifications.show({message: 'Error when updating item quantity.', color: 'red'});
                console.error('Error when updating item quantity.', err);
            });
    }

    const handleItemSubtract = (item_id, quantity) => {
        // Requesting Cart API to update item
        const data = { quantity: quantity - 1 }
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
        if (cartItems.length === 0) return; // cart is empty
        navigate('/checkout');
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
                    <Image 
                        src={item.image} 
                        alt={item.title}
                        h='100px'
                        w='100px'
                    />
                    <Text fw={500} fz='18px'>
                        {item.title}
                        <br/>
                        {'Size: ' + item.size}
                    </Text>
                    <Group wrap="nowrap">
                        <Button radius='xl' variant='transparent' mr='-20px'
                            onClick={() => handleItemSubtract(item.id, item.quantity)}
                        >
                            <IconMinus size={20}/>
                        </Button>
                        <Text fw={500} fz='18px'>
                            {item.quantity}
                        </Text>
                        <Button radius='xl' variant='transparent' ml='-20px'
                            onClick={() => handleItemAdd(item.id, item.quantity)}
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
import { Stack, Card, Group, Image, Text, Paper, Button, CloseButton } from "@mantine/core";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/useAuth";

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const { token } = useAuth();
    const [changed, setChanged] = useState(false);

    useEffect(() => {
        // Requesting Cart backend API
        axios.get('/api/carts', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(res => {
                let temp = res.data;
                setCartItems(temp);
            })
            .catch(err => {
                console.error('Error fetching items.', err);
            });
        setChanged(false);
    }, [token, changed]);

    const totalValFloat = cartItems.reduce((total, item) => {
        const numbers = item.value.match(/\d+(?:[.,]\d+)?/g).map(num => parseFloat(num.replace(',', '.')));
        
        const sum = numbers.reduce((acc, num) => acc + num, 0);
      
        return total + sum;
    }, 0);
    const totalVal = '$' + totalValFloat.toFixed(2);

    const handleClearCart = () => {
        // Requesting Cart API to clear
        axios.delete('/api/carts/clear', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(_ => {
                alert('The cart is now empty.');
                setChanged(true);
            })
            .catch(err => {
                console.error('Error clearing cart.', err);
            });
    };

    const handleItemDelete = (item_id) => {
        // Requesting Cart API to delete item
        axios.delete(`/api/carts/${item_id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(_ => {
                alert('Item removed successfully.');
                setChanged(true);
            })
            .catch(err => {
                console.error('Error deleting item.', err);
            });
    }

    return(
        <Stack p='20px' align='center'>
            <Paper shadow="sm" withBorder p='md' radius='md'>
                <Text fz='25px' ff="'Lilita One', sans-serif">
                    MY CART
                </Text>
            </Paper>
            {cartItems.map((item, index) => (
                <Card key={index} shadow="sm" padding="md" radius="md" withBorder>
                    <Group justify='center'>
                        <Image 
                            src={item.image} 
                            alt={item.title}
                            h='100px'
                            w='100px'
                        />
                        <Text fw={500} fz='18px'>
                            {item.title}
                            {' ' + item.size}
                        </Text>
                        <Text fw={500} fz='18px'>
                            {item.value}
                        </Text>
                        <CloseButton 
                            variant="transparent"
                            onClick={() => handleItemDelete(item.id)}
                        />
                    </Group>
                </Card>
            ))}
            <Paper shadow="sm" withBorder p='20px' radius='md'>
                <Group>
                    <Text fw={700} fz='20px'>
                        TOTAL: {totalVal}
                    </Text>
                    <Button
                        variant='outline'
                        size='md'
                        onClick={handleClearCart}
                    >
                        BUY
                    </Button>
                </Group>
            </Paper>
        </Stack>
    );
}

export default Cart
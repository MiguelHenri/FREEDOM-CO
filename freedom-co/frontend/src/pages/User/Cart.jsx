import { Stack, Card, Group, Image, Text, Paper, Button } from "@mantine/core";
import { useEffect, useState } from "react";
import axios from "axios";

function Cart() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        axios.get('/api/carts', )
            .then(res => {
                let temp = res.data;
                setCartItems(temp);
            })
            .catch(err => {
                console.error('Error fetching items.', err);
            });
    }, []);

    const totalValFloat = cartItems.reduce((total, item) => {
        const numbers = item.value.match(/\d+(?:[.,]\d+)?/g).map(num => parseFloat(num.replace(',', '.')));
        
        const sum = numbers.reduce((acc, num) => acc + num, 0);
      
        return total + sum;
    }, 0);
    const totalVal = '$' + totalValFloat.toFixed(2);

    const handleClearCart = () => {
        // TO-DO: update items using axios
        alert('The cart is now empty.');
    };

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
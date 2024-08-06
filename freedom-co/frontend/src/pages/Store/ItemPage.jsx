import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, SimpleGrid, Image, Text, Center, Stack,
        Group, Badge, Button, NumberInput } from '@mantine/core';
import axios from 'axios';
import { useAuth } from "../../contexts/useAuth";
import { notifications } from '@mantine/notifications';

function ItemPage() {
    const { id } = useParams();
    const [item, setItem] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const { token } = useAuth();

    // todo add item rank / eval (major)

    useEffect(() => {
        axios.get(`api/items/${id}`)
            .then(res => {
                setItem(res.data)
            })
            .catch(err => {
                console.error('Error fetching item', err);
            })
    }, [id]);

    const [selectedSize, setSelectedSize] = useState(null);

    const handleSizeClick = (size) => {
        setSelectedSize(size);
    };

    const handleAddToCart = () => {
        if (selectedSize) {
            const data = {
                id: id,
                size: selectedSize,
                quantity: quantity
            };
            // Calling backend cart api
            axios.post('/api/carts', data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
                .then(res => {
                    notifications.show({message: `${item.title} added to cart. Size: ${selectedSize}.`});
                    console.log(res.data.message);
                })
                .catch(err => {
                    if (err.response.status === 422 || err.response.status === 401) {
                        notifications.show({message: 'Please, log in or register a new account.', color: 'yellow'});
                    } else {
                        notifications.show({message: err.response.data.message, color: 'red'});
                    }
                    console.error('Unhandled error when adding item to cart.', err);
                })
        } else {
            notifications.show({message: 'Please, select a size before adding item to cart.', color: 'red'});
        }
    };

    // todo fix image responsive design

    return (
        <>
        <Box p='md' style={{flex:1}}> 
            <Center mt='3vh'>
            <SimpleGrid
                cols={{base: 1, sm: 1, md: 1, lg: 2, xl: 2}}
            >
                <Image
                    src={item.image}
                    alt={item.title}
                    h='70vh'
                    w='70vh'
                    mr='5vh'
                />

                <Stack ml='5vh'>
                    <Group>
                        <Text fz='30px' fw={700}>
                            {item.title}
                        </Text>
                        {item.tagColor && item.tag && (
                            <Badge color={item.tagColor} size='lg'>
                                {item.tag}
                            </Badge>
                        )}
                    </Group>
                    <Text fz='20px' align='justify'>
                        {item.description}
                    </Text>
                    <Group align='center'>
                        {item.oldValue && (
                            <Text fz='18px' td='line-through'>
                                {item.oldValue}
                            </Text>
                        )}
                        <Text fz='20px' fw={700}>  
                            {item.value}
                        </Text>
                    </Group>
                    <Group>
                        <Button
                            disabled={!item.size_quantity_pairs || item.size_quantity_pairs['P'] === 0}
                            size='compact-lg'
                            color={selectedSize === 'P' ? 'secondary.0' : 'gray'}
                            radius='md'
                            mt='3vh'
                            onClick={() => handleSizeClick('P')}
                        >
                            P
                        </Button>
                        <Button
                            disabled={!item.size_quantity_pairs || item.size_quantity_pairs['M'] === 0}
                            size='compact-lg'
                            color={selectedSize === 'M' ? 'secondary.0' : 'gray'}
                            radius='md'
                            mt='3vh'
                            onClick={() => handleSizeClick('M')}
                        >
                            M
                        </Button>
                        <Button
                            disabled={!item.size_quantity_pairs || item.size_quantity_pairs['G'] === 0}
                            size='compact-lg'
                            color={selectedSize === 'G' ? 'secondary.0' : 'gray'}
                            radius='md'
                            mt='3vh'
                            onClick={() => handleSizeClick('G')}
                        >
                            G
                        </Button>
                        <Button
                            disabled={!item.size_quantity_pairs || item.size_quantity_pairs['GG'] === 0}
                            size='compact-lg'
                            color={selectedSize === 'GG' ? 'secondary.0' : 'gray'}
                            radius='md'
                            mt='3vh'
                            onClick={() => handleSizeClick('GG')}
                        >
                            GG
                        </Button>
                    </Group>
                    <NumberInput
                        value={quantity}
                        onChange={(value) => setQuantity(value)}
                        min={1}
                        w='25vh' size='sm' mt='3vh'
                    />
                    <Button 
                        w='200px' mt='3vh'
                        radius='md' 
                        disabled={!selectedSize}
                        onClick={handleAddToCart}
                    >
                        ADD TO CART
                    </Button>
                </Stack>
                
            </SimpleGrid>
            </Center>
        </Box>
        </>
    );
}

export default ItemPage;
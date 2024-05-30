import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, SimpleGrid, Image, Text, Center, Stack,
        Group, Badge, Button } from '@mantine/core';

function ItemPage() {
    const { id } = useParams();

    const itemTest = {
        id: id,
        image: 'https://civilrights.msu.edu/_assets/images/placeholder/placeholder-200x200.jpg',
        title: 'Product',
        description: "New and cool.",
        value: '$100,00',
        oldValue: '$150,00',
        tagColor: 'blue',
        tag: 'New',
    }

    const [selectedSize, setSelectedSize] = useState(null);

    const handleSizeClick = (size) => {
        setSelectedSize(size);
    };

    const handleAddToCart = () => {
        if (selectedSize) {
            // TODO: adicionar lógica de carrinho
            alert(`${itemTest.title} adicionado ao carrinho. Tamanho: ${selectedSize}.`);
        } else {
            alert('Por favor, selecione um tamanho antes de adicionar ao carrinho.');
        }
    };

    return (
        <>
        <Box p='md' style={{flex:1}}> 
            <Center mt='3vh'>
            <SimpleGrid
                cols={{base: 1, sm: 1, md: 1, lg: 2, xl: 2}}
            >
                <Image
                    src={itemTest.image}
                    alt={itemTest.title}
                    h='70vh'
                    w='70vh'
                    mr='5vh'
                />

                <Stack ml='5vh'>
                    <Group>
                        <Text fz='30px' fw={700}>
                            {itemTest.title}
                        </Text>
                        {itemTest.tagColor && itemTest.tag && (
                            <Badge color={itemTest.tagColor} size='md'>
                                {itemTest.tag}
                            </Badge>
                        )}
                    </Group>
                    <Text fz='20px' align='justify'>
                        {itemTest.description}
                    </Text>
                    <Group align='center'>
                        {itemTest.oldValue && (
                            <Text fz='18px' td='line-through'>
                                {itemTest.oldValue}
                            </Text>
                        )}
                        <Text fz='20px' fw={700}>  
                            {itemTest.value}
                        </Text>
                    </Group>
                    <Group>
                        <Button
                            //disabled
                            size='compact-lg'
                            color={selectedSize === 'P' ? 'blue' : 'gray'}
                            radius='md'
                            mt='3vh'
                            onClick={() => handleSizeClick('P')}
                        >
                            P
                        </Button>
                        <Button
                            //disabled={selectedSize === 'M'}
                            size='compact-lg'
                            color={selectedSize === 'M' ? 'blue' : 'gray'}
                            radius='md'
                            mt='3vh'
                            onClick={() => handleSizeClick('M')}
                        >
                            M
                        </Button>
                        <Button
                            //disabled={selectedSize === 'G'}
                            size='compact-lg'
                            color={selectedSize === 'G' ? 'blue' : 'gray'}
                            radius='md'
                            mt='3vh'
                            onClick={() => handleSizeClick('G')}
                        >
                            G
                        </Button>
                        <Button
                            //disabled={selectedSize === 'GG'}
                            size='compact-lg'
                            color={selectedSize === 'GG' ? 'blue' : 'gray'}
                            radius='md'
                            mt='3vh'
                            onClick={() => handleSizeClick('GG')}
                        >
                            GG
                        </Button>
                    </Group>
                    <Button 
                        w='25vh' 
                        radius='md' 
                        mt='3vh'
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
};

export default ItemPage;
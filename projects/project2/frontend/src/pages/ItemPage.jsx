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

    return (
        <>
        <Box p='md' style={{flex:1}}> 
            <Center mt='3vh'>
            <SimpleGrid
                cols={{base: 1, sm: 1, md: 1, lg: 2, xl: 2}}
            >
                <Image
                    src={itemTest.image}
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
                    <Button w='25vh' radius='md' mt='3vh'>
                        BUY
                    </Button>
                </Stack>
                
            </SimpleGrid>
            </Center>
        </Box>
        </>
    );
};

export default ItemPage;
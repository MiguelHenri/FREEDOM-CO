import { Stack, Card, Group, Image, Text, Paper } from "@mantine/core";
import { v4 as uuidv4 } from "uuid";

function Cart() {

    const itemsTest = Array.from({ length: 8 }, () => ({
        id: uuidv4(),
        image: "https://civilrights.msu.edu/_assets/images/placeholder/placeholder-200x200.jpg",
        title: "Camiseta",
        description: "New and cool.",
        value: '$100,01',
        tagColor: 'blue',
        tag: 'New',
    }));

    const totalValFloat = itemsTest.reduce((total, item) => {
        const numbers = item.value.match(/\d+(?:[.,]\d+)?/g).map(num => parseFloat(num.replace(',', '.')));
        
        const sum = numbers.reduce((acc, num) => acc + num, 0);
      
        return total + sum;
    }, 0);

    const totalVal = '$' + totalValFloat.toFixed(2).replace('.', ',');

    return(
        <Stack p='20px' align='center'>
            <Paper shadow="sm" withBorder p='md' radius='md'>
                <Text fz='25px' ff="'Lilita One', sans-serif">
                    MY CART
                </Text>
            </Paper>
            {itemsTest.map((item, index) => (
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
                        </Text>
                        <Text fw={500} fz='18px'>
                            {item.value}
                        </Text>
                    </Group>
                </Card>
            ))}
            <Paper shadow="sm" withBorder p='lg' radius='md'>
                <Text fw={700} fz='20px'>
                    TOTAL: {totalVal}
                </Text>
            </Paper>
        </Stack>
    );
}

export default Cart
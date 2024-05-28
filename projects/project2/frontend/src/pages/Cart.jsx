import { Stack, Card, Group, Image, Text } from "@mantine/core";
import { v4 as uuidv4 } from "uuid";

function Cart() {

    const itemsTest = Array.from({ length: 4 }, () => ({
        id: uuidv4(),
        image: "https://civilrights.msu.edu/_assets/images/placeholder/placeholder-200x200.jpg",
        title: "Camiseta",
        description: "New and cool.",
        value: '$100,00',
        tagColor: 'blue',
        tag: 'New',
    }));

    return(
        <>
        <Stack p='20px' align='center'>
            {itemsTest.map((item, index) => (
                <Card key={index} shadow="sm" padding="md" radius="md" withBorder w='50vw'>
                    <Group justify='center'>
                        <Image 
                            src={item.image} 
                            alt={item.title}
                            h='100px'
                            w='100px'
                        />
                        <Text fw={700} fz='20px'>
                            {item.title}
                        </Text>
                        <Text fw={700} fz='20px'>
                            {item.value}
                        </Text>
                    </Group>
                </Card>
            ))}
        </Stack>
        </>
    );
}

export default Cart
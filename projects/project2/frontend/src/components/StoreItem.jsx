import { Text, Card, Image, Title, Group, Badge } from "@mantine/core";


function StoreItem({item, ...others}) {
    const {id, image, title, description, value, oldValue, tag, tagColor} = item;

    return(
        <Card 
            shadow='sm' 
            padding='md' 
            radius='md' 
            withBorder
            h='300px' w='300px'
            {...others}
        >
            {image && 
                <Card.Section>
                    <Image src={image} alt={title} h='200px'/>
                </Card.Section>
            }
            
            <Card.Section p='sm'>
                <Group justify='space-between'>
                    <Title order={4}>
                        {title}
                    </Title>
                    {tagColor && tag && (
                        <Badge color={tagColor} size='lg'>
                            {tag}
                        </Badge>
                    )}
                </Group>
                <Text mb='3px'>
                    {description}
                </Text>
                <Group align='center'>
                    {oldValue && (
                        <Text td='line-through'>
                            {oldValue}
                        </Text>
                    )}
                    <Text fw={700}>  
                        {value}
                    </Text>
                </Group>
            </Card.Section>
        </Card>
    );
}

export default StoreItem;
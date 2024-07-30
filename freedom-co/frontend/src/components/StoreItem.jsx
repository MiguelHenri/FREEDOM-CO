import { Text, Card, Image, Title, Group, Badge } from "@mantine/core";
import { useHover } from "@mantine/hooks";

function StoreItem({item, ...others}) {
    const {id, image, title, description, value, oldValue, tag, tagColor} = item;
    const { hovered, ref } = useHover();

    return(
        <Card 
            shadow='sm' 
            padding='md' 
            radius='md' 
            withBorder
            h='300px' w='300px'
            component='a'
            href={`store/${id}`}
            ref={ref}
            {...others}
        >
            {image && 
                <Card.Section>
                    <Image 
                        src={image} 
                        alt={title} 
                        h={hovered ? '200px' : '300px'}
                    />
                </Card.Section>
            }
            
            {hovered &&
                <Card.Section p='sm' bg='primary.0'>
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
            }
        </Card>
    );
}

export default StoreItem;
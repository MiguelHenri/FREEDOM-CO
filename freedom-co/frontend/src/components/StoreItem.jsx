import { Text, Card, Image, Group, Badge } from "@mantine/core";
import { useHover } from "@mantine/hooks";

function StoreItem({item, outOfStock, ...others}) {
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
                        opacity={outOfStock ? 0.5 : 1}
                    />
                </Card.Section>
            }
            
            {hovered &&
                <Card.Section p='sm' bg='primary.0'>
                    <Group justify='space-between'>
                        <Text fw={700} fz='18px' truncate='end'>
                            {outOfStock && "[Out of Stock] "}
                            {title}
                        </Text>
                        {tagColor && tag && (
                            <Badge color={tagColor} size='lg'>
                                {tag}
                            </Badge>
                        )}
                    </Group>
                    <Text mb='3px' truncate='end'>
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
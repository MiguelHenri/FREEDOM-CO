import { Text, Card, Image, Group, Badge } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { useEffect, useState } from "react";

function StoreItem({item, ...others}) {
    const {id, image, title, description, value, oldValue, tag, tagColor, size_quantity_pairs} = item;
    const { hovered, ref } = useHover();

    const [outOfStock, setOutOfStock] = useState(false);

    useEffect(() => {
        const isOutOfStock = Object.values(size_quantity_pairs).every(value => value === 0);
        setOutOfStock(isOutOfStock);
    }, [size_quantity_pairs]);

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
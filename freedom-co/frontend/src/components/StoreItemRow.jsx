import { Center, SimpleGrid } from "@mantine/core";
import StoreItem from "./StoreItem";
import { useEffect, useState } from "react";
import axios from "axios";

/**
 * Renders a row of store items based on the specified filter.
 * @param {string} filter - The filter to be applied to the store items.
 *                          Possible values: 'sale', 'new', 'tees', 'pants', 'accessories'.
 * @param {Object} others - Other props passed to the store item row.
 */
function StoreItemRow({filter, ...others}) {

    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get('api/items')
            .then(res => {
                let filtered = res.data;
                switch(filter) {
                    case 'sale':
                        filtered = filtered.filter(item => item.tag === 'SALE');
                        break;
                    case 'new':
                        filtered = filtered.filter(item => item.tag === 'NEW');
                        break;
                    case 'tees':
                        filtered = filtered.filter(item => item.type === 'tee');
                        break;
                    case 'pants':
                        filtered = filtered.filter(item => item.type === 'pant');
                        break;
                    case 'accessories':
                        filtered = filtered.filter(item => item.type === 'accessory');
                        break;
                    default:
                }
                // Filtering items using TAG to define priority
                setItems(filtered.sort((a, b) => {
                    const getPriority = (tag) => {
                        if (tag === 'NEW') return 1; // NEW high priority
                        if (tag === 'SALE') return 3;
                        return 2; // No tag
                    };
                    return getPriority(a.tag) - getPriority(b.tag); 
                }));
            })
            .catch(err => {
                console.error('Error fetching items', err);
            });

    }, [filter]);

    return(
        <Center>
            <SimpleGrid
                spacing='70px'
                verticalSpacing='20px'
                cols={{base: 1, sm: 2, md: 2, lg: 3, xl: 4}}
                {...others}
            >
                {items.
                slice()
                .sort((a, b) => { // Sorting out of stock items to the end
                    const aHasStock = Object.values(a.size_quantity_pairs).every(value => value === 0);
                    const bHasStock = Object.values(b.size_quantity_pairs).every(value => value === 0);
                    if (aHasStock && !bHasStock) return 1;
                    if (!aHasStock && bHasStock) return -1;
                    return 0;
                })
                .map((item) => {
                    const isOutOfStock = Object.values(item.size_quantity_pairs).every(value => value === 0);
                    return (
                        <StoreItem key={item.id} item={item} outOfStock={isOutOfStock}/>
                    )
                })}
            </SimpleGrid>
        </Center>
    );
}

export default StoreItemRow;
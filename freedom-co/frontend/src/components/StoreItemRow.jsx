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
                setItems(filtered);
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
                {items.map((item) =>
                    <StoreItem key={item.id} item={item}/>
                )}
            </SimpleGrid>
        </Center>
    );
}

export default StoreItemRow;
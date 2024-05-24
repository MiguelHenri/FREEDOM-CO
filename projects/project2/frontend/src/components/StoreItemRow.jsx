import { Center, SimpleGrid } from "@mantine/core";
import StoreItem from "./StoreItem";
import {v4 as uuidv4} from "uuid";

function StoreItemRow({items={}, lancamento, ...others}) {

    const itemsTest1 = Array.from({ length: 4 }, () => ({
        id: uuidv4(),
        image: "https://civilrights.msu.edu/_assets/images/placeholder/placeholder-200x200.jpg",
        title: "Product",
        description: "New and cool.",
        value: '$100,00',
        tagColor: 'blue',
        tag: 'New',
    }));

    const itemsTest2 = Array.from({ length: 12 }, () => ({
        id: uuidv4(),
        image: "https://civilrights.msu.edu/_assets/images/placeholder/placeholder-200x200.jpg",
        title: "Product",
        description: "Cool.",
        value: '$80,00',
        oldValue: '$100,00',
        tagColor: 'green',
        tag: 'Sale'
    }));

    const itemsTest = lancamento ? itemsTest1 : itemsTest2;

    return(
        <Center>
            <SimpleGrid
                spacing='70px'
                verticalSpacing='20px'
                cols={{base: 1, sm: 1, md: 2, lg: 3, xl: 4}}
                {...others}
            >
                {itemsTest.map((item) =>
                    <StoreItem key={item.id} item={item}/>
                )}
            </SimpleGrid>
        </Center>
    );
}

export default StoreItemRow;
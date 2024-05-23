import { Center, SimpleGrid } from "@mantine/core";
import StoreItem from "./StoreItem";

function StoreItemRow({items={}, lancamento, ...others}) {

    const itemsTest1 = Array(4).fill({
        image: "https://civilrights.msu.edu/_assets/images/placeholder/placeholder-200x200.jpg",
        title: "Produto",
        description: "Esse produto é massa.",
        value: 'R$400,00',
        oldValue: '',
        tagColor: 'blue',
        tag: 'Lançamento'
    })

    const itemsTest2 = Array(4).fill({
        image: "https://civilrights.msu.edu/_assets/images/placeholder/placeholder-200x200.jpg",
        title: "Produto",
        description: "Esse produto é massa.",
        value: 'R$400,00',
        oldValue: 'R$300,00',
        tagColor: 'green',
        tag: 'Oferta'
    })

    const itemsTest = lancamento ? itemsTest1 : itemsTest2;

    return(
        <Center>
            <SimpleGrid
                spacing='70px'
                cols={{base: 1, sm: 1, md: 2, lg: 3, xl: 4}}
                {...others}
            >
                {itemsTest.map((item, index) =>
                    <StoreItem key={index} item={item}/>
                )}
            </SimpleGrid>
        </Center>
    );
}

export default StoreItemRow;
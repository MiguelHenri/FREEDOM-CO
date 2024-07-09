import {useDisclosure} from "@mantine/hooks";
import {Burger, Group, Anchor, Center, Stack} from "@mantine/core";
import {HashLink} from "react-router-hash-link";
import {v4 as uuidv4} from "uuid";
import { IconShoppingCart, IconUser } from '@tabler/icons-react';

function Header() {
    const [opened, {toggle}] = useDisclosure();

    const links = [
        {label: "FREEDOM&CO", link: "/"},
        {label: "STORE", link: "/store"},
        {label: "TEES", link: "/tees"},
        {label: "PANTS", link: "/pants"},
        {label: "ACCESSORIES", link: "/accessories"}
    ];

    const otherLinks = [
        {icon: <IconShoppingCart stroke={2.5}/>, link: "/cart"},
        {icon: <IconUser stroke={2.5}/>, link: "/login"}
    ];

    const fsize = '20px';
    const height = '55px'; 
    const fullheight = '220px'; 

    const linkButtons = links.map(l => (
        <Anchor
            key={uuidv4()}
            href={l.link}
            component={HashLink} to={l.link}
            fz={fsize}
            ff="'Lilita One', sans-serif"
        >
            {l.label}
        </Anchor>));

    const otherButtons = otherLinks.map(l => (
        <Anchor
            key={uuidv4()}
            href={l.link}
            component={HashLink} to={l.link}
        >
            {l.icon}
        </Anchor>
    ));

    return (
        <Center h={{base: (opened ? {fullheight} : {height}), sm: {height}}} p={fsize} bg='primary.0'>
            <Stack hiddenFrom="md">
                {opened ?
                    <Stack justify="center" align="center" p="lg">
                        {linkButtons}
                        {otherButtons}
                        <Burger opened={opened} onClick={toggle} size="md" />
                    </Stack>
                    :
                    <Center>
                        <Burger opened={opened} onClick={toggle} size="md" />
                    </Center>
                }
            </Stack>
            <Group visibleFrom="md" gap="60px">
                {linkButtons}
                {otherButtons}
            </Group>
        </Center>
    );
}

export default Header;
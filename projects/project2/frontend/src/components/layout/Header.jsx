import {useDisclosure} from "@mantine/hooks";
import {Burger, Group, Anchor, Center, Stack} from "@mantine/core";
import {HashLink} from "react-router-hash-link";
import {v4 as uuidv4} from "uuid";

function Header() {
    const [opened, {toggle}] = useDisclosure();

    const links = [
        {label: "FREEDOM&CO", link: "/"},
        {label: "CAMISETAS", link: "/camisetas"},
        {label: "CALÇAS", link: "/calcas"},
        {label: "ACESSÓRIOS", link: "/acessorios"}
    ];

    const linkButtons = links.map(l => (
        <Anchor
            key={uuidv4()}
            href={l.link}
            component={HashLink} to={l.link}
        >
            {l.label}
        </Anchor>));

    return (
        <Center h={{base: (opened ? 'auto' : '5em'), sm: '5em'}}>
            <Stack hiddenFrom="sm">
                {opened ?
                    <Stack justify="center" align="center" p="lg">
                        {linkButtons}
                        <Burger opened={opened} onClick={toggle} size="md" />
                    </Stack>
                    :
                    <Center>
                        <Burger opened={opened} onClick={toggle} size="md" />
                    </Center>
                }
            </Stack>
            <Group visibleFrom="sm" gap="60px">
                {linkButtons}
            </Group>
        </Center>
    );
}

export default Header
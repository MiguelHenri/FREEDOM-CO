import {useDisclosure} from "@mantine/hooks";
import {Burger, Group, Anchor, Center, Stack} from "@mantine/core";
import {HashLink} from "react-router-hash-link";
import {v4 as uuidv4} from "uuid";

function Header() {
    const [opened, {toggle}] = useDisclosure();

    const links = [
        {label: "FREEDOM&CO", link: "/"},
        {label: "TEES", link: "/tees"},
        {label: "PANTS", link: "/pants"},
        {label: "ACCESSORIES", link: "/accessories"}
    ];

    const fsize = '18px';
    const height = '54px'; // *3
    const fullheight = '216px'; // *links length

    const linkButtons = links.map(l => (
        <Anchor
            key={uuidv4()}
            href={l.link}
            component={HashLink} to={l.link}
            fz={fsize}
        >
            {l.label}
        </Anchor>));

    return (
        <Center h={{base: (opened ? {fullheight} : {height}), sm: {height}}} mt={fsize} mb={fsize}>
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
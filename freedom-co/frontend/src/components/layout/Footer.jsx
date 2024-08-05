import { Group, Text, Stack, Flex } from "@mantine/core";
import { IconBrandInstagram } from '@tabler/icons-react';
import { IconMail } from '@tabler/icons-react';
import { IconPhone } from '@tabler/icons-react';

function Footer() {
    
    return (
        <Flex 
            justify="space-between" 
            align="center" 
            bg='primary.0'
            mt='20px'
        >
            <Stack p='20px' ml='20px'>
                <Text fw={500} fz='15px'>
                    © 2024 FREEDOM&CO. All rights reserved.
                </Text>
                <Text fw={500} fz='13px'>
                    27, Freedom Street, New York, NY 10001
                </Text>
            </Stack>
            <Group wrap='nowrap' mr='20px'>
                <IconBrandInstagram stroke={1.5} width={40} height={40}/>
                <IconMail stroke={1.5} width={40} height={40}/>
                <IconPhone stroke={1.5} width={40} height={40}/>
            </Group>
        </Flex>
    );
}

export default Footer;
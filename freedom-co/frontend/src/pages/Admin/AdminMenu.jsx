import { Button, Stack, Paper, Text } from "@mantine/core";
import { HashLink } from 'react-router-hash-link';

function AdminMenu() {

    return (
        <Stack align='center' p='20px'>
            <Paper shadow="sm" withBorder p='md' radius='md'>
                <Text fz='25px' ff="'Lilita One', sans-serif">
                    ADMIN MENU
                </Text>
            </Paper>
            <Button
                variant='outline'
                size='md'
                w={{base: '70vw', sm: '50vw', md: '40vw', lg:'30vw'}}
                component={HashLink}
                to='/admin/create'
            >
                CREATE or EDIT ITEM
            </Button>
            <Button
                variant='outline'
                size='md'
                w={{base: '70vw', sm: '50vw', md: '40vw', lg:'30vw'}}
                component={HashLink}
                to='/admin/delete'
            >
                DELETE ITEM
            </Button>
        </Stack>
    )
}

export default AdminMenu;
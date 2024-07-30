import { Stack, Text, Paper, TextInput, Button } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import { useAuth } from "../../contexts/useAuth";

function DeleteProduct() {
    
    const { token } = useAuth();

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            id: '',
        },
        validate: {
            id: isNotEmpty('ID is required.'),
        }
    })

    function onSubmit(values) {
        console.log(values);

        axios.delete(`api/items/${values.id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(res => {
                notifications.show({message: `Item deleted successfully.`});
                console.log(res);
            })
            .catch(err => {
                notifications.show({message: 'Error when deleting item.', color: 'red'});
                console.error('Error when deleting item: ', err);
            });
    }

    return (
        <Stack 
            p='20px' 
            align='center' 
            justify='center'
            component={'form'}
            onSubmit={form.onSubmit(onSubmit)}
        > 
            <Paper shadow='sm' radius='md' p='md' withBorder>
                <Text ta='center' fz="25px" ff="'Lilita One', sans-serif">
                    DELETE ITEM
                </Text>
            </Paper>
            <TextInput 
                label='ID' withAsterisk
                placeholder='Item ID'
                size='md'
                w={{ base:'300px', sm: '500px', md: '600px', lg: '700px', xl: '700px'}}
                {...form.getInputProps('id')}
            />
            <Button
                variant='outline'
                size='md'
                type='submit'
            >
                DELETE
            </Button>
        </Stack>
    );
}

export default DeleteProduct;
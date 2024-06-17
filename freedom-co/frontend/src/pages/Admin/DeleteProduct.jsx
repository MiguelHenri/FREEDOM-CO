import { Stack, Text, Paper, TextInput, Button } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import axios from "axios";

function DeleteProduct() {

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            id: '',
        },
        validate: {
            id: isNotEmpty('ID is required.'),
        }
    })

    // TO-DO: are you sure you want to delete ?
    function onSubmit(values) {
        console.log(values);

        axios.delete(`api/items/${values.id}`)
            .then(res => {
                console.log(res);
                alert(`Item deleted successfully.`);
            })
            .catch(err => {
                console.error('Error when deleting item: ', err);
                alert('Error when deleting item.');
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
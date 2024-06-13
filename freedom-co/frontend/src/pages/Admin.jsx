import { Stack, TextInput, Button, NativeSelect, 
        NumberInput, Text, Paper } from "@mantine/core";
import { useForm, isNotEmpty } from "@mantine/form";

function Admin() {

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            image: '',
            title: '',
            description: '',
            value: '',
            type: '',
            oldValue: '',
            tagColor: '',
            tag: '',
            size_quantity_pairs: {
                P: 0,
                M: 0,
                G: 0,
                GG: 0,
            },
        },
        validate: {
            image: (value) => (/^(https?:\/\/[^\s$.?#].[^\s]*)$/.test(value) ? 
                null 
                : 
                'Image must be a valid URL.'),
            title: isNotEmpty('Title is required.'),
            description: isNotEmpty('Description is required.'),
            value: (value) => (/^\$\d+\.\d{2}$/.test(value) ? 
                null
                : 
                'Value must start with $ and have two decimal places.'),
            type: isNotEmpty('Type is required.'),
        },
    });

    function onSubmit(values) {
        console.log(values);
    }

    const inputProps = {
        size: 'md',
        w: { base:'300px', sm: '500px', md: '600px', lg: '700px', xl: '700px'},
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
                    REGISTER NEW ITEM
                </Text>
            </Paper>
            <TextInput 
                label='Title' withAsterisk
                placeholder='Product'
                {...inputProps} 
                {...form.getInputProps('title')}
            />
            <TextInput 
                label='Description' withAsterisk
                placeholder='This is a cool product.'
                {...inputProps} 
                {...form.getInputProps('description')}
            />
            <TextInput // TO-DO 
                label='Image' withAsterisk
                placeholder='https://link-to/my-image.jpg'
                {...inputProps} 
                {...form.getInputProps('image')}
            />
            <NativeSelect 
                label='Type' withAsterisk
                data={[
                    { value: 'tee', label: 'Tee' },
                    { value: 'pant', label: 'Pant' },
                    { value: 'accessory', label: 'Accessory' },
                ]}
                {...inputProps}
                {...form.getInputProps('type')}
            />
            <TextInput 
                label='Value' withAsterisk
                placeholder='$100.00'
                {...inputProps}
                {...form.getInputProps('value')}
            />
            <TextInput
                label='Old Value' 
                placeholder='$200.00'
                {...inputProps}
                {...form.getInputProps('oldValue')}
            />
            <NativeSelect 
                label='Tag' 
                data={[
                    { value: '', label: 'No tag' },
                    { value: 'SALE', label: 'Sale' },
                    { value: 'NEW', label: 'New' },
                ]}
                {...inputProps}
                {...form.getInputProps('tag')}
            />
            <NumberInput
                label="Quantity for P"
                {...inputProps}
                {...form.getInputProps('size_quantity_pairs.P')}
            />
            <NumberInput
                label="Quantity for M"
                {...inputProps}
                {...form.getInputProps('size_quantity_pairs.M')}
            />
            <NumberInput
                label="Quantity for G"
                {...inputProps}
                {...form.getInputProps('size_quantity_pairs.G')}
            />
            <NumberInput
                label="Quantity for GG"
                {...inputProps}
                {...form.getInputProps('size_quantity_pairs.GG')}
            />

            <Button
                variant='outline'
                size='md'
                type='submit'
            >
                Save
            </Button>
        </Stack>
    )
}

export default Admin;
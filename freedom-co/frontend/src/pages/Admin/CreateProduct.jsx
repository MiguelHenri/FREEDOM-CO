import { Stack, TextInput, Button, NativeSelect, 
    NumberInput, Text, Paper, 
    SegmentedControl} from "@mantine/core";
import { useForm, isNotEmpty } from "@mantine/form";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

function CreateProduct() {

    let navigate = useNavigate();
    const [mode, setMode] = useState('create');

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            id: '',
            image: '',
            title: '',
            description: '',
            value: '',
            type: '',
            oldvalue: '',
            tagcolor: '',
            tag: '',
            size_quantity_pairs: {
                P: 0,
                M: 0,
                G: 0,
                GG: 0,
            },
        },
        validate: {
            id: (value) => {
                if (mode === 'edit') {
                    if (!value) {
                        return 'ID is required.'
                    }
                }
            },
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

    function onSubmit({id, ...values}) {
        console.log(values);

        if (values.tag === 'NEW') {
            values.tagcolor = 'blue';
        } else if (values.tag === 'SALE') {
            values.tagcolor = 'green';
        }

        if (id) {
            axios.put(`api/items/${id}`, values)
                .then(res => {
                    navigate(`/store/${res.data.id}`);
                    alert('Item edited successfully.');
                })
                .catch(err => {
                    console.error("Unhandled error when editing item: ", err);
                    alert('Error when editing item.');
                });
        } else {
            axios.post('api/items', values)
                .then(res => {
                    navigate(`/store/${res.data.id}`);
                    alert('Item created successfully.');
                })
                .catch(err => {
                    console.error("Unhandled error when creating item: ", err);
                    alert('Error when creating item.');
                });
        }
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
                    CREATE or EDIT ITEM
                </Text>
            </Paper>
            <SegmentedControl
                data={[
                    { label: 'Create Item', value: 'create'},
                    { label: 'Edit Item', value: 'edit'},
                ]}
                value={mode}
                onChange={setMode}
                {...inputProps}
            />
            {mode === 'edit' && (
                <TextInput 
                    label='ID' withAsterisk
                    placeholder='Enter ID'
                    {...inputProps} 
                    {...form.getInputProps('id')}
                />
            )}
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
                    { value: '', label: 'Select type' },
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
                {...form.getInputProps('oldvalue')}
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
                SAVE
            </Button>
        </Stack>
    );
}

export default CreateProduct;
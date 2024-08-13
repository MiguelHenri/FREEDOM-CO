import { Stack, Text, Paper, TextInput, Button, LoadingOverlay } from "@mantine/core"
import { useAuth } from "../../contexts/useAuth";
import { useForm, isNotEmpty } from "@mantine/form";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";

function Informations() {
    const { token } = useAuth();
    const [loading, setLoading] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            address_line_1: '',
            address_line_2: '',
            city: '',
            state: '',
            country: '',
            zip_code: '',
        },
        validate: {
            address_line_1: isNotEmpty('Address line 1 is required.'),
            city: isNotEmpty('City is required.'),
            state: isNotEmpty('State is required.'),
            country: isNotEmpty('Country is required.'),
            zip_code: isNotEmpty('Zip Code is required.'),
        }
    });

    const onSubmit = (values) => {
        setButtonLoading(true);
        axios.put('/api/users', values, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(res => {
                notifications.show({message: res.data.message});
            })
            .catch(err => {
                notifications.show({message: err.response.data.message, color: 'red'});
                console.error('Unhandled error when editing information.', err);
            })
            .finally(() => setButtonLoading(false));
    }

    useEffect(() => {
        setLoading(true);
        axios.get('/api/users', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(res => {
                form.initialize(res.data);
            })
            .catch(err => {
                notifications.show({message: err.response.data.message, color: 'red'});
                console.error('Unhandled error when editing information.', err);
            })
            .finally(() => setLoading(false));
    }, [])

    return (
        <Stack 
            p='20px' 
            align='center' 
            component={'form'}
            onSubmit={form.onSubmit(onSubmit)}
        >
            <Paper shadow="sm" withBorder p='md' radius='md'>
                <Text fz='25px' ff="'Lilita One', sans-serif">
                    INFORMATIONS
                </Text>
            </Paper>

            <LoadingOverlay visible={loading}/>

            <TextInput
                withAsterisk
                label="Address line 1"
                {...form.getInputProps('address_line_1')}
            />
            <TextInput
                label="Address line 2"
                {...form.getInputProps('address_line_2')}
            />
            <TextInput
                withAsterisk
                label="City"
                {...form.getInputProps('city')}
            />
            <TextInput
                withAsterisk
                label="State"
                {...form.getInputProps('state')}
            />
            <TextInput
                withAsterisk
                label="Country"
                {...form.getInputProps('country')}
            />
            <TextInput
                withAsterisk
                label="ZIP / Postcode"
                {...form.getInputProps('zip_code')}
            />
            <Button
                variant='outline'
                size='md'
                type='submit'
                loading={buttonLoading}
            >
                SAVE
            </Button>
        </Stack>
    )
}

export default Informations;
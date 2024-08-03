import { Stack, Paper, Text, SegmentedControl, Button, 
        CopyButton, Tooltip, ActionIcon, 
        Group} from "@mantine/core";
import { IconCopy, IconCheck } from '@tabler/icons-react';
import axios from "axios";
import { useState } from "react";
import { useAuth } from "../../contexts/useAuth";
import { QRCodeCanvas } from 'qrcode.react';
import { notifications } from "@mantine/notifications";

function Checkout() {
    const [mode, setMode] = useState('pix');
    const [pixPayload, setPixPayload] = useState(localStorage.getItem('PixPayload') || '');
    const { token } = useAuth();

    // todo show all itens and total value
    // todo confirm/store shipping address (major)

    const generatePixCode = () => {
        if (pixPayload) return; // will not generate more than once

        // Requesting checkout backend API
        axios.get('/api/carts/checkout', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(res => {
                let temp = res.data.payload;
                setPixPayload(temp);
                localStorage.setItem('PixPayload', temp);
            })
            .catch(err => {
                notifications.show({message: 'Error fetching pix payload.', color: 'red'});
                console.error('Error fetching pix payload.', err);
            })
    }

    return (
        <Stack p='20px' align='center'>
            <Paper shadow="sm" withBorder p='md' radius='md'>
                <Text fz='25px' ff="'Lilita One', sans-serif">
                    CHECKOUT
                </Text>
            </Paper>
            <SegmentedControl
                data={[
                    {label: 'Pix', value: 'pix'},
                    {label: 'Credit/Debit Card', value: 'card', disabled: true},
                ]}
                size='md'
                value={mode}
                onChange={setMode}
            />
            {mode === 'pix' && (
                <>
                {!pixPayload && (
                <Button onClick={generatePixCode}>
                    Generate Pix Code
                </Button>
                )}

                {pixPayload && (
                <>
                <Text>
                    Scan the QR code or copy the Pix code below:
                </Text>
                <QRCodeCanvas value={pixPayload} size={256} />
                <Group align="center" justify="center">
                    <Text truncate='end' w={256}>
                        {pixPayload}
                    </Text>
                    <CopyButton value={pixPayload} timeout={3000}>
                    {({ copied, copy }) => (
                        <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                        <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
                            {copied ? (
                            <IconCheck />
                            ) : (
                            <IconCopy />
                            )}
                        </ActionIcon>
                        </Tooltip>
                    )}
                    </CopyButton>
                </Group>
                <Button onClick={() => localStorage.removeItem('PixPayload')}>
                    CONFIRM
                </Button>
                </>
                )}
                
                </>
            )}
        </Stack>
    )
}

export default Checkout;
import crcmod

class Pix:
    def __init__(self, name, key, amount, city, txid):
        self.name = name
        self.key = key
        self.amount = amount.replace(',', '.')
        self.city = city
        self.txid = txid

    def generatePayload(self):
        # Calculate lengths
        name_len = len(self.name)
        key_len = len(self.key)
        amount_len = len(self.amount)
        city_len = len(self.city)
        txid_len = len(self.txid)

        # Construct payload segments
        merchantAccount_segment = f'0014BR.GOV.BCB.PIX01{key_len:02}{self.key}'
        transactionAmount_segment = f'{amount_len:02}{float(self.amount):.2f}'
        additionalDataField_segment = f'05{txid_len:02}{self.txid}'

        # Full payload construction
        payloadFormat = '000201'
        merchantAccount = f'26{len(merchantAccount_segment):02}{merchantAccount_segment}'
        merchantCategoryCode = '52040000'
        transactionCurrency = '5303986'
        transactionAmount = f'54{transactionAmount_segment}'
        countryCode = '5802BR'
        merchantName = f'59{name_len:02}{self.name}'
        merchantCity = f'60{city_len:02}{self.city}'
        additionalDataField = f'62{len(additionalDataField_segment):02}{additionalDataField_segment}'
        crc16 = '6304'

        # Construct the payload without CRC16
        payload = (payloadFormat + 
                   merchantAccount + 
                   merchantCategoryCode + 
                   transactionCurrency + 
                   transactionAmount + 
                   countryCode + 
                   merchantName + 
                   merchantCity + 
                   additionalDataField +
                   crc16)

        # Calculate CRC16 of the payload
        crc16 = crcmod.mkCrcFun(poly=0x11021, initCrc=0xFFFF, rev=False, xorOut=0x0000)
        crc = crc16(payload.encode('utf-8'))
        crc16Code = hex(crc)
        crc16Code_formatted = crc16Code.replace('0x', '').upper().zfill(4)

        # Append CRC to the payload
        payload_with_crc = payload + crc16Code_formatted

        return payload_with_crc
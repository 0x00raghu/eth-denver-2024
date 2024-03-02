import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  ModalFooter,
  Input,
  InputGroup,
  InputLeftElement,
  Badge,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { fundUSDC, fundEth } from '@/context/_aa/ContractFunctions'; // Import the additional contract functions
import { useWallet } from '@/context/_aa/WalletContext';
import { ButtonGroups } from './button-groups';

const DonateModal = ({ item, isOpen, onClose, index }: any) => {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const { address, sendUserOperation, txnStatus, resetTxnStatus } = useWallet();
  const [selectedCrypto, setSelectedCrypto]: any = useState(null);
  const [selectedAmount, setSelectedAmount]: any = useState(null);

  const handleFundUSDC = async () => {
    const { uo }: any = await fundUSDC(selectedAmount, index);
    await sendUserOperation(uo);
  };

  // Function to handle funding Ethereum
  const handleFundEth = async () => {
    const { uo }: any = await fundEth(selectedAmount, index); // Adjust arguments as needed
    await sendUserOperation(uo);
  };

  const handleConfirm = async () => {
    if (selectedCrypto === 'USDC') {
      handleFundUSDC();
    }
    if (selectedCrypto === 'ETH') {
      handleFundEth();
    }
  };

  const handleSelectButton = async (value: string) => {
    setSelectedCrypto(value);
  };

  return (
    <Modal size={'lg'} isCentered initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Donate to {''}
          <Badge colorScheme="purple">{item.name}</Badge>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>To Address</FormLabel> <Input placeholder="To wallet address" value={item.owner} disabled />
          </FormControl>

          <FormControl>
            <FormLabel>Crypto</FormLabel>

            <ButtonGroups className="bg-black" handleSelectButton={handleSelectButton} />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Amount</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em">
                $
              </InputLeftElement>
              <Input
                ref={initialRef}
                placeholder="0.1"
                type="number"
                onChange={(e: any) => {
                  setSelectedAmount(e.target.value);
                }}
              />
            </InputGroup>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button borderColor="green.500" mr={3} onClick={handleConfirm}>
            Confirm
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DonateModal;

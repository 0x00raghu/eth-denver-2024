import { createProject } from '@/context/_aa/ContractFunctions';
import { useWallet } from '@/context/_aa/WalletContext';
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
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { redirect } from 'next/navigation';

const CreateProjectModal = ({ item, isOpen, onClose }: any) => {
  const { address, sendUserOperation, txnStatus, resetTxnStatus } = useWallet();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    githubUrl: '',
    walletAddress: '',
  });

  useEffect(() => {
    console.log(item, 'item');
    setFormData({
      name: item.name,
      githubUrl: item.html_url,
      walletAddress: address as string,
    });
  }, [item.id]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevItem: any) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleCreateProject = async (_projectName: string, _githubUrl: string) => {
    const { uo }: any = await createProject(_projectName, _githubUrl);
    await sendUserOperation(uo);
  };

  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    console.log('Form Values:', formData);
    await handleCreateProject(formData.name, formData.githubUrl);
    setLoading(false);
    setTimeout(() => {
      resetTxnStatus();
    }, 2000);
  };

  useEffect(() => {
    if (txnStatus === 'completed') {
      onClose();
      redirect('/projects');
    }
  }, [txnStatus]);

  return (
    <Modal size={'lg'} isCentered initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>List your Project</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Project Name</FormLabel>
            <Input name="name" placeholder="Project Name" value={formData.name} onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Git Url</FormLabel>
            <Input name="html_url" placeholder="Git Url" value={formData.githubUrl} disabled />
          </FormControl>
          <FormControl>
            <FormLabel>Wallet Address</FormLabel>
            <Input name="walletAddress" placeholder="To wallet address" value={formData.walletAddress} disabled />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            spinnerPlacement="start"
            onClick={handleSubmit}
            isLoading={loading}
            loadingText={txnStatus === 'started' ? 'txn submitting...' : txnStatus === 'initiated' ? 'completing txn ...' : 'Successfully Completed'}
          >
            Confirm
          </Button>
          <Button
            onClick={() => {
              resetTxnStatus();
              onClose();
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateProjectModal;

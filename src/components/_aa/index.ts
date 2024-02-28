import { createModularAccountAlchemyClient } from '@alchemy/aa-alchemy';
import { createWalletClient, custom } from 'viem';
import { baseSepolia, WalletClientSigner } from '@alchemy/aa-core';
import { Address } from '@alchemy/aa-core';

const sendUserOperation = async () => {
  console.log(window.ethereum, 'window.ethereum');
  const chain = baseSepolia;
  const client = createWalletClient({
    chain,
    transport: custom(window.ethereum),
  });

  const eoaSigner = new WalletClientSigner(client, 'json-rpc');

  const provider = await createModularAccountAlchemyClient({
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    chain,
    signer: eoaSigner,
  });

  console.log('Smart Account Address: ', provider.getAddress());

  const shivaAddress = '0x5B4d77e199FE8e5090009C72d2a5581C74FEbE89' as Address;
  // Send a user operation from your smart account to Vitalik that does nothing
  const { hash: uoHash } = await provider.sendUserOperation({
    uo: {
      target: shivaAddress, // The desired target contract address
      data: '0x', // The desired call data
      value: BigInt('100000000000000000'), // (Optional) value to send the target contract address
    },
  });

  console.log('UserOperation Hash: ', uoHash); // Log the user operation hash

  // Wait for the user operation to be mined
  const txHash = await provider.waitForUserOperationTransaction({
    hash: uoHash,
  });

  console.log('Transaction Hash: ', txHash); // Log the transaction hash
};

export { sendUserOperation };

import { createModularAccountAlchemyClient } from '@alchemy/aa-alchemy';
import { LocalAccountSigner, baseSepolia, type Hex, Address } from '@alchemy/aa-core';
import { createWalletClient, custom } from "viem";
import { mainnet, WalletClientSigner } from "@alchemy/aa-core";
// import { WalletClientSigner } from "@alchemy/core";

const client = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum),
});

// this can now be used as an signer for a Smart Contract Account
export const eoaSigner = new WalletClientSigner(
  client,
  "json-rpc" //signerType
);

const chain = baseSepolia; // arbiSepolia

// The private key of your EOA that will be the signer to connect with the Modular Account
// Our recommendation is to store the private key in an environment variable
const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY as Hex;
console.log('PRIVATE_KEY: ', PRIVATE_KEY);
const signer = LocalAccountSigner.privateKeyToAccountSigner(PRIVATE_KEY);

// Create a smart account client to send user operations from your smart account
const createClient = async () => {
//   // Fund your account address with ETH to send for the user operations
//   const client = await createModularAccountAlchemyClient({
//     // get your Alchemy API key at https://dashboard.alchemy.com
//     apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY as string,
//     chain,
//     signer,
//   });
//   // (e.g. Get Sepolia ETH at https://sepoliafaucet.com)
//   console.log('Smart Account Address: ', client.getAddress()); // Log the smart account address
};

const sendUserOperation = async () => {
  const provider = await createModularAccountAlchemyClient({
    // get your Alchemy API key at https://dashboard.alchemy.com
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    chain,
    signer:eoaSigner,
  });
  // Fund your account address with ETH to send for the user operations
  // (e.g. Get Sepolia ETH at https://sepoliafaucet.com)
  console.log('Smart Account Address: ', provider.getAddress()); // Log the smart account address

  const shivaAddress = '0x5B4d77e199FE8e5090009C72d2a5581C74FEbE89' as Address;
  // Send a user operation from your smart account to Vitalik that does nothing
  const { hash: uoHash } = await provider.sendUserOperation({
    uo: {
      target: shivaAddress, // The desired target contract address
      data: '0x', // The desired call data
      value: BigInt("100000000000000000"), // (Optional) value to send the target contract address
    },
  });

  console.log('UserOperation Hash: ', uoHash); // Log the user operation hash

  // Wait for the user operation to be mined
  const txHash = await provider.waitForUserOperationTransaction({
    hash: uoHash,
  });

  console.log('Transaction Hash: ', txHash); // Log the transaction hash
}

export { createClient ,sendUserOperation };

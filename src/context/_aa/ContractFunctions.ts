import { encodeFunctionData } from 'viem';
import { config } from '@/constants/config';

const contractAddress: string = config.MAIN_CONTRACT.ADDRESS;
const abi = config.MAIN_CONTRACT.ABI;

export const createProject = (name: string, gitUrl: string) => {
  const uoCallData = encodeFunctionData({
    abi,
    functionName: 'createProject',
    args: [name, gitUrl],
  });
  console.log(uoCallData, 'uiCallData');

  return { uoCallData, contractAddress };
};

export const fundUSDC = (amount: number, projectNo: number) => {
  const uoCallData = encodeFunctionData({
    abi,
    functionName: 'fundUSDC',
    args: [BigInt(amount), projectNo],
  });
  console.log(uoCallData, 'uiCallData');

  return { uoCallData, contractAddress };
};

export const fundEth = (amount: number, projectNo: number) => {
  const uoCallData = encodeFunctionData({
    abi,
    functionName: 'fundEth',
    args: [BigInt(amount), projectNo],
  });
  console.log(uoCallData, 'uiCallData');

  return { uoCallData, contractAddress };
};

export const withdrawUSDC = (amount: number, projectNo: number) => {
  const uoCallData = encodeFunctionData({
    abi,
    functionName: 'withdrawUSDC',
    args: [BigInt(amount), projectNo],
  });
  console.log(uoCallData, 'uiCallData');

  return { uoCallData, contractAddress };
};

export const withdrawEth = (projectNo: number) => {
  const uoCallData = encodeFunctionData({
    abi,
    functionName: 'withdrawEth',
    args: [projectNo],
  });
  console.log(uoCallData, 'uiCallData');

  return { uoCallData, contractAddress };
};

export const getBalance = () => {
  const uoCallData = encodeFunctionData({
    abi,
    functionName: 'getBalance',
    args: [],
  });
  console.log(uoCallData, 'uiCallData');

  return { uoCallData, contractAddress };
};

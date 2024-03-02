import { encodeFunctionData, parseEther } from 'viem';
import { config } from '@/constants/config';
import { ethers } from 'ethers';

const contractAddress: string = config.MAIN_CONTRACT.ADDRESS;
const abi = config.MAIN_CONTRACT.ABI;

export const createProject = (name: string, gitUrl: string) => {
  const uoCallData = encodeFunctionData({
    abi,
    functionName: 'createProject',
    args: [name, gitUrl],
  });
  console.log(uoCallData, 'uiCallData');
  const uo = [{ target: config.MAIN_CONTRACT.ADDRESS, data: uoCallData, value: '0' }];
  return { uo };
};

export const fundUSDC = (amount: number, projectNo: number) => {
  const approveCallData = encodeFunctionData({
    abi: config.USDC_CONTRACT.ABI,
    functionName: 'approve',
    args: [config.MAIN_CONTRACT.ADDRESS, parseEther(`${amount}`)],
  });

  const uoCallData = encodeFunctionData({
    abi,
    functionName: 'fundUSDC',
    args: [parseEther(`${amount}`), projectNo],
  });

  const uo = [
    {
      target: config.USDC_CONTRACT.ADDRESS,
      data: approveCallData,
      value: '0',
    },
    { target: config.MAIN_CONTRACT.ADDRESS, data: uoCallData, value: '0' },
  ];

  return { uo };
};

export const fundEth = (amount: number, projectNo: number) => {
  console.log(amount, projectNo);

  const uoCallData = encodeFunctionData({
    abi,
    functionName: 'fundEth',
    args: [projectNo],
  });
  console.log(uoCallData, 'uiCallData');
  const uo = [{ target: config.MAIN_CONTRACT.ADDRESS, data: uoCallData, value: amount }];

  return { uo };
};

export const withdrawUSDC = (amount: number, projectNo: number) => {
  const uoCallData = encodeFunctionData({
    abi,
    functionName: 'withdrawUSDC',
    args: [BigInt(amount), projectNo],
  });
  console.log(uoCallData, 'uiCallData');
  const uo = [{ target: config.MAIN_CONTRACT.ADDRESS, data: uoCallData, value: '0' }];

  return { uo };
};

export const withdrawEth = (projectNo: number) => {
  const uoCallData = encodeFunctionData({
    abi,
    functionName: 'withdrawEth',
    args: [projectNo],
  });
  console.log(uoCallData, 'uiCallData');
  const uo = [{ target: config.MAIN_CONTRACT.ADDRESS, data: uoCallData, value: '0' }];

  return { uo };
};

export const getBalance = () => {
  const uoCallData = encodeFunctionData({
    abi,
    functionName: 'getBalance',
    args: [],
  });
  console.log(uoCallData, 'uiCallData');
  const uo = [{ target: config.MAIN_CONTRACT.ADDRESS, data: uoCallData, value: '0' }];

  return { uo };
};

export const getProjectFundInUSD = async (projectNo: number) => {
  const contract_one: any = new ethers.Contract(contractAddress, abi, new ethers.BrowserProvider(window.ethereum));
  const result = await contract_one.getProjectFundInUSD(projectNo);
  const _ethBal: any = ethers.formatUnits(result[0], 'ether');
  const _usdcBal: any = ethers.formatUnits(result[1], 'ether');
  const ethBalance = _ethBal / Math.pow(10, 8);
  const usdcBalance = _usdcBal / Math.pow(10, 8);
  return { ethBalance, usdcBalance };
};

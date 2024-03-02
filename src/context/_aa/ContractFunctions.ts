import { encodeFunctionData, parseEther } from 'viem';
import { config } from '@/constants/config';
import { ethers } from 'ethers';

export const createProject = (name: string, gitUrl: string, chain: number) => {
  const contractAddress: string = config.MAIN_CONTRACT(chain).ADDRESS;
  const abi = config.MAIN_CONTRACT(chain).ABI;
  const uoCallData = encodeFunctionData({
    abi,
    functionName: 'createProject',
    args: [name, gitUrl],
  });
  console.log(uoCallData, 'uiCallData');
  const uo = [{ target: contractAddress, data: uoCallData, value: '0' }];
  return { uo };
};

export const fundUSDC = (amount: number, projectNo: number, chain: number) => {
  const contractAddress: string = config.MAIN_CONTRACT(chain).ADDRESS;
  const abi = config.MAIN_CONTRACT(chain).ABI;
  const approveCallData = encodeFunctionData({
    abi: config.USDC_CONTRACT(chain).ABI,
    functionName: 'approve',
    args: [contractAddress, parseEther(`${amount}`)],
  });

  const uoCallData = encodeFunctionData({
    abi,
    functionName: 'fundUSDC',
    args: [parseEther(`${amount}`), projectNo],
  });

  const uo = [
    {
      target: config.USDC_CONTRACT(chain).ADDRESS,
      data: approveCallData,
      value: '0',
    },
    { target: contractAddress, data: uoCallData, value: '0' },
  ];

  return { uo };
};

export const fundEth = (amount: number, projectNo: number, chain: number) => {
  const contractAddress: string = config.MAIN_CONTRACT(chain).ADDRESS;
  const abi = config.MAIN_CONTRACT(chain).ABI;
  console.log(amount, projectNo);

  const uoCallData = encodeFunctionData({
    abi,
    functionName: 'fundEth',
    args: [projectNo],
  });
  console.log(uoCallData, 'uiCallData');
  const uo = [{ target: contractAddress, data: uoCallData, value: amount }];

  return { uo };
};

export const withdrawUSDC = (amount: number, projectNo: number, chain: number) => {
  const contractAddress: string = config.MAIN_CONTRACT(chain).ADDRESS;
  const abi = config.MAIN_CONTRACT(chain).ABI;
  const uoCallData = encodeFunctionData({
    abi,
    functionName: 'withdrawUSDC',
    args: [BigInt(amount), projectNo],
  });
  console.log(uoCallData, 'uiCallData');
  const uo = [{ target: contractAddress, data: uoCallData, value: '0' }];

  return { uo };
};

export const withdrawEth = (projectNo: number, chain: number) => {
  const contractAddress: string = config.MAIN_CONTRACT(chain).ADDRESS;
  const abi = config.MAIN_CONTRACT(chain).ABI;
  const uoCallData = encodeFunctionData({
    abi,
    functionName: 'withdrawEth',
    args: [projectNo],
  });
  console.log(uoCallData, 'uiCallData');
  const uo = [{ target: contractAddress, data: uoCallData, value: '0' }];

  return { uo };
};

export const getProjectFundInUSD = async (projectNo: number, chain: number) => {
  console.log(projectNo, 'projectNo');
  console.log(chain, 'chain');

  const contractAddress: string = config.MAIN_CONTRACT(chain).ADDRESS;
  console.log(contractAddress, 'contractAddress');
  const abi = config.MAIN_CONTRACT(chain).ABI;
  const contract_one: any = new ethers.Contract(contractAddress, abi, new ethers.BrowserProvider(window.ethereum));
  const result = await contract_one.getProjectFundInUSD(projectNo);
  const _ethBal: any = ethers.formatUnits(result[0], 'ether');
  const _usdcBal: any = ethers.formatUnits(result[1], 'ether');
  const ethBalance = _ethBal / Math.pow(10, 8);
  const usdcBalance = _usdcBal / Math.pow(10, 8);
  return { ethBalance, usdcBalance };
};

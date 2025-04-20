import { ethers } from 'ethers';
import { InjectedConnector } from '@web3-react/injected-connector';

export const injected = new InjectedConnector({
  supportedChainIds: [11155111], // Sepolia Testnet
});

export const getLibrary = (provider) => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
};

export const getContract = async (address, abi, library) => {
  try {
    const signer = library.getSigner();
    return new ethers.Contract(address, abi, signer);
  } catch (error) {
    console.error('Error getting contract:', error);
    throw error;
  }
};

export const formatAddress = (address) => {
  if (!address) return ''; // Return empty string if address is undefined or null
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const formatDate = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleDateString();
};

export const handleError = (error) => {
  if (error.code === 4001) {
    return 'Transaction rejected by user';
  }
  if (error.code === -32603) {
    return 'Insufficient funds for transaction';
  }
  return error.message;
}; 
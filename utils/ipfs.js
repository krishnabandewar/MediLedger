import axios from 'axios';

// Using Cloudflare's IPFS gateway as it's generally reliable and fast
const IPFS_GATEWAY = 'https://cloudflare-ipfs.com/ipfs/';

export const uploadToIPFS = async (data) => {
  try {
    // Convert data to JSON string
    const jsonData = JSON.stringify(data);
    
    // Create a Blob from the JSON data
    const blob = new Blob([jsonData], { type: 'application/json' });
    
    // Create FormData
    const formData = new FormData();
    formData.append('file', blob, 'data.json');

    // Upload to IPFS
    const response = await axios.post('https://ipfs.infura.io:5001/api/v0/add', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data.Hash;
  } catch (error) {
    console.error('Error uploading to IPFS:', error);
    throw new Error('Failed to upload to IPFS');
  }
};

export const fetchFromIPFS = async (hash) => {
  try {
    if (!hash) {
      throw new Error('IPFS hash is required');
    }

    const response = await axios.get(`${IPFS_GATEWAY}${hash}`);
    return response.data;
  } catch (error) {
    console.error('Error retrieving from IPFS:', error);
    throw new Error('Failed to retrieve from IPFS');
  }
}; 
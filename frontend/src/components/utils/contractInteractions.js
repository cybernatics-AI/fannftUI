import { openContractCall } from '@stacks/connect';
import {
  uintCV,
  stringAsciiCV,
  standardPrincipalCV,
  contractPrincipalCV,
  callReadOnlyFunction,
} from '@stacks/transactions';
import { StacksNetwork } from '@stacks/network';

const CONTRACT_ADDRESS = 'SP000000000000000000002Q6VF78'; // Replace with actual contract address
const CONTRACT_NAME = 'starpass-nft'; // Replace with actual contract name

/**
 * Mint a new NFT
 * @param {StacksNetwork} network - The Stacks network instance
 * @param {string} recipient - The recipient's Stacks address
 * @param {number} tier - The NFT tier
 * @param {string} metadata - The NFT metadata
 * @param {number} royaltyPercentage - The royalty percentage
 * @returns {Promise<void>}
 */
export async function mintNFT(network, recipient, tier, metadata, royaltyPercentage) {
  const functionArgs = [
    standardPrincipalCV(recipient),
    uintCV(tier),
    stringAsciiCV(metadata),
    uintCV(royaltyPercentage)
  ];

  const options = {
    network,
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'mint-nft',
    functionArgs,
    appDetails: {
      name: 'Starpass NFT',
      icon: window.location.origin + '/app-icon.png',
    },
    onFinish: data => {
      console.log('Stacks Transaction:', data.stacksTransaction);
      console.log('Transaction ID:', data.txId);
      console.log('Raw transaction:', data.txRaw);
    },
  };

  await openContractCall(options);
}

/**
 * Transfer an NFT
 * @param {StacksNetwork} network - The Stacks network instance
 * @param {number} nftId - The ID of the NFT to transfer
 * @param {string} recipient - The recipient's Stacks address
 * @returns {Promise<void>}
 */
export async function transferNFT(network, nftId, recipient) {
  const functionArgs = [
    uintCV(nftId),
    standardPrincipalCV(recipient)
  ];

  const options = {
    network,
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'transfer-nft',
    functionArgs,
    appDetails: {
      name: 'Starpass NFT',
      icon: window.location.origin + '/app-icon.png',
    },
    onFinish: data => {
      console.log('Stacks Transaction:', data.stacksTransaction);
      console.log('Transaction ID:', data.txId);
      console.log('Raw transaction:', data.txRaw);
    },
  };

  await openContractCall(options);
}

/**
 * Lease an NFT
 * @param {StacksNetwork} network - The Stacks network instance
 * @param {number} nftId - The ID of the NFT to lease
 * @param {string} lessee - The lessee's Stacks address
 * @param {number} leaseDuration - The duration of the lease in blocks
 * @returns {Promise<void>}
 */
export async function leaseNFT(network, nftId, lessee, leaseDuration) {
  const functionArgs = [
    uintCV(nftId),
    standardPrincipalCV(lessee),
    uintCV(leaseDuration)
  ];

  const options = {
    network,
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'lease-nft',
    functionArgs,
    appDetails: {
      name: 'Starpass NFT',
      icon: window.location.origin + '/app-icon.png',
    },
    onFinish: data => {
      console.log('Stacks Transaction:', data.stacksTransaction);
      console.log('Transaction ID:', data.txId);
      console.log('Raw transaction:', data.txRaw);
    },
  };

  await openContractCall(options);
}

/**
 * Get NFT information
 * @param {StacksNetwork} network - The Stacks network instance
 * @param {number} nftId - The ID of the NFT
 * @returns {Promise<Object>} The NFT information
 */
export async function getNFTInfo(network, nftId) {
  try {
    const currentHolderResponse = await callReadOnlyFunction({
      network,
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: 'get-current-holder',
      functionArgs: [uintCV(nftId)],
    });

    const tierResponse = await callReadOnlyFunction({
      network,
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: 'get-tier',
      functionArgs: [uintCV(nftId)],
    });

    const metadataResponse = await callReadOnlyFunction({
      network,
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: 'get-metadata',
      functionArgs: [uintCV(nftId)],
    });

    return {
      currentHolder: currentHolderResponse.value,
      tier: tierResponse.value,
      metadata: metadataResponse.value,
    };
  } catch (error) {
    console.error('Error fetching NFT info:', error);
    throw new Error('Failed to fetch NFT information');
  }
}

/**
 * Get the total number of NFTs minted
 * @param {StacksNetwork} network - The Stacks network instance
 * @returns {Promise<number>} The total number of NFTs
 */
export async function getTotalNFTs(network) {
  try {
    const response = await callReadOnlyFunction({
      network,
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: 'get-total-nfts',
      functionArgs: [],
    });

    return response.value.value;
  } catch (error) {
    console.error('Error fetching total NFTs:', error);
    throw new Error('Failed to fetch total number of NFTs');
  }
}

/**
 * Check if an address owns a specific NFT
 * @param {StacksNetwork} network - The Stacks network instance
 * @param {string} address - The Stacks address to check
 * @param {number} nftId - The ID of the NFT
 * @returns {Promise<boolean>} Whether the address owns the NFT
 */
export async function ownsNFT(network, address, nftId) {
  try {
    const response = await callReadOnlyFunction({
      network,
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: 'owns-nft',
      functionArgs: [standardPrincipalCV(address), uintCV(nftId)],
    });

    return response.value;
  } catch (error) {
    console.error('Error checking NFT ownership:', error);
    throw new Error('Failed to check NFT ownership');
  }
}

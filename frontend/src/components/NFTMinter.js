import React, { useState } from 'react';
import { openContractCall } from '@stacks/connect';
import { stringAsciiCV, uintCV, standardPrincipalCV } from '@stacks/transactions';
import { toast } from 'react-toastify';

const CONTRACT_ADDRESS = 'SP000000000000000000002Q6VF78'; // Replace with actual contract address
const CONTRACT_NAME = 'starpass-nft'; // Replace with actual contract name

export function NFTMinter({ userSession, network }) {
  const [recipient, setRecipient] = useState('');
  const [tier, setTier] = useState('');
  const [metadata, setMetadata] = useState('');
  const [royaltyPercentage, setRoyaltyPercentage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    if (!recipient || !tier || !metadata || !royaltyPercentage) {
      toast.error('All fields are required');
      return false;
    }
    if (!/^SP[A-Z0-9]{37}$/.test(recipient)) {
      toast.error('Invalid recipient address');
      return false;
    }
    if (isNaN(tier) || tier < 0 || tier > 10) {
      toast.error('Tier must be a number between 0 and 10');
      return false;
    }
    if (isNaN(royaltyPercentage) || royaltyPercentage < 0 || royaltyPercentage > 100) {
      toast.error('Royalty percentage must be a number between 0 and 100');
      return false;
    }
    return true;
  };

  const handleMint = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const functionArgs = [
        standardPrincipalCV(recipient),
        uintCV(parseInt(tier)),
        stringAsciiCV(metadata),
        uintCV(parseInt(royaltyPercentage))
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
        onFinish: (data) => {
          console.log('Stacks Transaction:', data.stacksTransaction);
          console.log('Transaction ID:', data.txId);
          console.log('Raw transaction:', data.txRaw);
          toast.success(`NFT minted successfully. Transaction ID: ${data.txId}`);
          // Clear form
          setRecipient('');
          setTier('');
          setMetadata('');
          setRoyaltyPercentage('');
        },
      };

      await openContractCall(options);
    } catch (error) {
      console.error('Error minting NFT:', error);
      toast.error(`Failed to mint NFT: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="nft-minter card">
      <h2>Mint New NFT</h2>
      <form onSubmit={handleMint}>
        <input
          type="text"
          placeholder="Recipient Address"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Tier (0-10)"
          value={tier}
          onChange={(e) => setTier(e.target.value)}
          min="0"
          max="10"
          required
        />
        <input
          type="text"
          placeholder="Metadata"
          value={metadata}
          onChange={(e) => setMetadata(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Royalty Percentage (0-100)"
          value={royaltyPercentage}
          onChange={(e) => setRoyaltyPercentage(e.target.value)}
          min="0"
          max="100"
          required
        />
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Minting...' : 'Mint NFT'}
        </button>
      </form>
    </div>
  );
}
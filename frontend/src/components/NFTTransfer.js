import React, { useState } from 'react';
import { openContractCall } from '@stacks/connect';
import { uintCV, standardPrincipalCV } from '@stacks/transactions';
import { toast } from 'react-toastify';

const CONTRACT_ADDRESS = 'SP000000000000000000002Q6VF78'; // Replace with actual contract address
const CONTRACT_NAME = 'starpass-nft'; // Replace with actual contract name

export function NFTTransfer({ userSession, network }) {
  const [nftId, setNftId] = useState('');
  const [recipient, setRecipient] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    if (!nftId || !recipient) {
      toast.error('All fields are required');
      return false;
    }
    if (isNaN(nftId) || nftId < 1) {
      toast.error('NFT ID must be a positive number');
      return false;
    }
    if (!/^SP[A-Z0-9]{37}$/.test(recipient)) {
      toast.error('Invalid recipient address');
      return false;
    }
    return true;
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const functionArgs = [
        uintCV(parseInt(nftId)),
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
        onFinish: (data) => {
          console.log('Stacks Transaction:', data.stacksTransaction);
          console.log('Transaction ID:', data.txId);
          console.log('Raw transaction:', data.txRaw);
          toast.success(`NFT transferred successfully. Transaction ID: ${data.txId}`);
          // Clear form
          setNftId('');
          setRecipient('');
        },
      };

      await openContractCall(options);
    } catch (error) {
      console.error('Error transferring NFT:', error);
      toast.error(`Failed to transfer NFT: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="nft-transfer card">
      <h2>Transfer NFT</h2>
      <form onSubmit={handleTransfer}>
        <input
          type="number"
          placeholder="NFT ID"
          value={nftId}
          onChange={(e) => setNftId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Recipient Address"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Transferring...' : 'Transfer NFT'}
        </button>
      </form>
    </div>
  );
}

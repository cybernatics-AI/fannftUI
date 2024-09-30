import React, { useState } from 'react';
import { openContractCall } from '@stacks/connect';
import { uintCV, standardPrincipalCV } from '@stacks/transactions';
import { toast } from 'react-toastify';

const CONTRACT_ADDRESS = 'SP000000000000000000002Q6VF78'; // Replace with actual contract address
const CONTRACT_NAME = 'starpass-nft'; // Replace with actual contract name

export function NFTLeasing({ userSession, network }) {
  const [nftId, setNftId] = useState('');
  const [lessee, setLessee] = useState('');
  const [leaseDuration, setLeaseDuration] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    if (!nftId || !lessee || !leaseDuration) {
      toast.error('All fields are required');
      return false;
    }
    if (isNaN(nftId) || nftId < 1) {
      toast.error('NFT ID must be a positive number');
      return false;
    }
    if (!/^SP[A-Z0-9]{37}$/.test(lessee)) {
      toast.error('Invalid lessee address');
      return false;
    }
    if (isNaN(leaseDuration) || leaseDuration < 1) {
      toast.error('Lease duration must be a positive number');
      return false;
    }
    return true;
  };

  const handleLease = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const functionArgs = [
        uintCV(parseInt(nftId)),
        standardPrincipalCV(lessee),
        uintCV(parseInt(leaseDuration))
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
        onFinish: (data) => {
          console.log('Stacks Transaction:', data.stacksTransaction);
          console.log('Transaction ID:', data.txId);
          console.log('Raw transaction:', data.txRaw);
          toast.success(`NFT leased successfully. Transaction ID: ${data.txId}`);
          // Clear form
          setNftId('');
          setLessee('');
          setLeaseDuration('');
        },
      };

      await openContractCall(options);
    } catch (error) {
      console.error('Error leasing NFT:', error);
      toast.error(`Failed to lease NFT: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="nft-leasing card">
      <h2>Lease NFT</h2>
      <form onSubmit={handleLease}>
        <input
          type="number"
          placeholder="NFT ID"
          value={nftId}
          onChange={(e) => setNftId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Lessee Address"
          value={lessee}
          onChange={(e) => setLessee(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Lease Duration (blocks)"
          value={leaseDuration}
          onChange={(e) => setLeaseDuration(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Leasing...' : 'Lease NFT'}
        </button>
      </form>
    </div>
  );
}

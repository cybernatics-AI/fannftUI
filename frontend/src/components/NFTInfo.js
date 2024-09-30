import React, { useState } from 'react';
import { callReadOnlyFunction } from '@stacks/transactions';
import { cvToString } from '@stacks/transactions';
import { toast } from 'react-toastify';

const CONTRACT_ADDRESS = 'SP000000000000000000002Q6VF78'; // Replace with actual contract address
const CONTRACT_NAME = 'starpass-nft'; // Replace with actual contract name

export function NFTInfo({ userSession, network }) {
  const [nftId, setNftId] = useState('');
  const [nftInfo, setNftInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    if (!nftId) {
      toast.error('NFT ID is required');
      return false;
    }
    if (isNaN(nftId) || nftId < 1) {
      toast.error('NFT ID must be a positive number');
      return false;
    }
    return true;
  };

  const handleGetInfo = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const functions = ['get-current-holder', 'get-tier', 'get-metadata'];
      const results = await Promise.all(functions.map(async (functionName) => {
        const result = await callReadOnlyFunction({
          network,
          contractAddress: CONTRACT_ADDRESS,
          contractName: CONTRACT_NAME,
          functionName,
          functionArgs: [nftId],
          senderAddress: userSession.loadUserData().profile.stxAddress.mainnet,
        });
        return cvToString(result);
      }));

      setNftInfo({
        currentHolder: results[0],
        tier: results[1],
        metadata: results[2],
      });
    } catch (error) {
      console.error('Error fetching NFT info:', error);
      toast.error(`Failed to fetch NFT info: ${error.message}`);
      setNftInfo(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="nft-info card">
      <h2>NFT Information</h2>
      <form onSubmit={handleGetInfo}>
        <input
          type="number"
          placeholder="NFT ID"
          value={nftId}
          onChange={(e) => setNftId(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Fetching...' : 'Get Info'}
        </button>
      </form>
      {nftInfo && (
        <div className="nft-info-display">
          <p><strong>Current Holder:</strong> {nftInfo.currentHolder}</p>
          <p><strong>Tier:</strong> {nftInfo.tier}</p>
          <p><strong>Metadata:</strong> {nftInfo.metadata}</p>
        </div>
      )}
    </div>
  );
}

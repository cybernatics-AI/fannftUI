import React, { useState, useEffect } from 'react';
import { Connect } from '@stacks/connect-react';
import { UserSession, AppConfig } from '@stacks/auth';
import { StacksMainnet } from '@stacks/network';
import { NFTMinter } from './components/NFTMinter';
import { NFTTransfer } from './components/NFTTransfer';
import { NFTLeasing } from './components/NFTLeasing';
import { NFTInfo } from './components/NFTInfo';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/App.css';

const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig });
const network = new StacksMainnet();

function App() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        setUserData(userData);
        setLoading(false);
      }).catch((error) => {
        console.error('Error handling pending sign in:', error);
        toast.error('Failed to sign in. Please try again.');
        setLoading(false);
      });
    } else if (userSession.isUserSignedIn()) {
      setUserData(userSession.loadUserData());
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  const handleSignIn = () => {
    userSession.redirectToSignIn();
  };

  const handleSignOut = () => {
    userSession.signUserOut();
    setUserData(null);
    toast.info('Signed out successfully');
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Connect userSession={userSession}>
      <div className="App">
        <header className="App-header">
          <h1>Starpass NFT</h1>
          {!userData ? (
            <button onClick={handleSignIn} className="btn btn-primary">Connect Wallet</button>
          ) : (
            <div>
              <span className="user-address">{userData.profile.stxAddress.mainnet}</span>
              <button onClick={handleSignOut} className="btn btn-secondary">Disconnect</button>
            </div>
          )}
        </header>
        <main>
          {userData && (
            <ErrorBoundary>
              <NFTMinter userSession={userSession} network={network} />
              <NFTTransfer userSession={userSession} network={network} />
              <NFTLeasing userSession={userSession} network={network} />
              <NFTInfo userSession={userSession} network={network} />
            </ErrorBoundary>
          )}
        </main>
        <ToastContainer position="bottom-right" />
      </div>
    </Connect>
  );
}

export default App;
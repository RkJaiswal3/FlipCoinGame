import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

function WalletConnection() {
    const [account, setAccount] = useState(null);

    useEffect(() => {
        if (window.ethereum) {
            //eslint-disable-next-line 
            const web3 = new Web3(window.ethereum);
            try {
                window.ethereum.enable().then((accounts) => {
                    console.log('Connected accounts:', accounts);
                    setAccount(accounts[0]);
                });
            } catch (e) {
                console.error(e);
            }
        } else {
            console.error('Ethereum provider not found. Please install MetaMask.');
        }
    }, []);

    return (
        <div>
            <h1>Your Account: {account}</h1>
        </div>
    );
}

export default WalletConnection;

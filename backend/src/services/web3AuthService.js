import { Web3Auth } from '@web3auth/node-sdk';
import config from '../config/env.js';

const web3Auth = new Web3Auth({
  clientId: config.web3AuthClientId,
  web3AuthNetwork: 'sapphire_devnet',
});

export const verifyIdToken = async (idToken) => {
  const userInfo = await web3Auth.getUserInfo(idToken);
  return userInfo;
};


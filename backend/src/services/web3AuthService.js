const { Web3Auth } = require('@web3auth/node-sdk');
const config = require('../config/env');

const web3Auth = new Web3Auth({
  clientId: config.web3AuthClientId,
  web3AuthNetwork: 'sapphire_devnet',
});

exports.verifyIdToken = async (idToken) => {
  const userInfo = await web3Auth.getUserInfo(idToken);
  return userInfo;
};


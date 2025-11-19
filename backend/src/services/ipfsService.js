const { create } = require('ipfs-http-client');
const config = require('../config/env');
const logger = require('../config/logger');

let client = null;

if (config.ipfsProjectId && config.ipfsProjectSecret) {
  const auth =
    'Basic ' +
    Buffer.from(`${config.ipfsProjectId}:${config.ipfsProjectSecret}`).toString('base64');

  client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
      authorization: auth,
    },
  });
} else {
  logger.warn('IPFS credentials missing. Falling back to mock CID responses.');
}

const pinData = async (payload) => {
  if (!client) {
    return `mock-cid-${Date.now()}`;
  }
  const { cid } = await client.add(payload);
  return cid.toString();
};

exports.pinJson = async (data) => {
  try {
    return await pinData(JSON.stringify(data));
  } catch (error) {
    logger.error({ err: error }, 'Failed to pin JSON to IPFS, returning mock CID');
    return `mock-cid-${Date.now()}`;
  }
};

exports.pinFile = async (buffer) => {
  try {
    return await pinData(buffer);
  } catch (error) {
    logger.error({ err: error }, 'Failed to pin file to IPFS, returning mock CID');
    return `mock-cid-${Date.now()}`;
  }
};


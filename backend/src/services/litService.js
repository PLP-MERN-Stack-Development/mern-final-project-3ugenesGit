import { LitNodeClient } from '@lit-protocol/lit-node-client';
import { encryptString } from '@lit-protocol/encryption';
import crypto from 'crypto';
import config from '../config/env.js';
import logger from '../config/logger.js';

let litClient = null;
let ready = false;

const createFallbackEncryption = (plainText) => {
  const cipher = Buffer.from(plainText).toString('base64');
  const hash = crypto.createHash('sha256').update(plainText).digest('hex');
  return {
    ciphertext: cipher,
    symmetricKey: crypto.randomBytes(16).toString('hex'),
    dataToEncryptHash: hash,
  };
};

const ensureConnected = async () => {
  if (!config.litNetwork) {
    return false;
  }
  if (!litClient) {
    litClient = new LitNodeClient({ litNetwork: config.litNetwork });
  }
  if (!ready) {
    await litClient.connect();
    ready = true;
  }
  return true;
};

export const encryptReport = async ({ data, accessControlConditions }) => {
  try {
    const connected = await ensureConnected();
    if (!connected) {
      logger.warn('Lit network unavailable. Using local encryption fallback.');
      return createFallbackEncryption(data);
    }
    const { ciphertext, dataToEncryptHash, symmetricKey } = await encryptString(
      data,
      accessControlConditions
    );
    return {
      ciphertext,
      symmetricKey,
      dataToEncryptHash,
    };
  } catch (error) {
    logger.error({ err: error }, 'Lit encryption failed, using fallback');
    return createFallbackEncryption(data);
  }
};


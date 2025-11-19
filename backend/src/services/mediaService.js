import fs from 'fs';
import sharp from 'sharp';
import logger from '../config/logger.js';
import * as ipfsService from './ipfsService.js';

const bufferFromUpload = async (file) => {
  if (file.data) {
    return file.data;
  }
  if (file.tempFilePath) {
    return fs.promises.readFile(file.tempFilePath);
  }
  throw new Error('Invalid file payload');
};

const bufferFromDataUrl = (dataUrl) => {
  const matches = dataUrl.match(/^data:(.+);base64,(.+)$/);
  if (!matches) {
    throw new Error('Invalid data URL');
  }
  const mimeType = matches[1];
  const buffer = Buffer.from(matches[2], 'base64');
  return { buffer, mimeType };
};

const optimiseBuffer = async (inputBuffer) => {
  return sharp(inputBuffer).rotate().resize(1600, null, { fit: 'inside' }).jpeg({ quality: 80 }).toBuffer();
};

export const handleUpload = async (file) => {
  if (!file) return null;
  const rawBuffer = await bufferFromUpload(file);
  const optimised = await optimiseBuffer(rawBuffer);
  const cid = await ipfsService.pinFile(optimised);

  return {
    cid,
    url: `https://ipfs.io/ipfs/${cid}`,
    mimeType: file.mimetype || 'image/jpeg',
    size: optimised.length,
  };
};

export const handleDataUrl = async (dataUrl) => {
  if (!dataUrl) return null;
  const { buffer, mimeType } = bufferFromDataUrl(dataUrl);
  const optimised = await optimiseBuffer(buffer);
  const cid = await ipfsService.pinFile(optimised);
  return {
    cid,
    url: `https://ipfs.io/ipfs/${cid}`,
    mimeType,
    size: optimised.length,
  };
};

export const cleanupTempFile = async (file) => {
  if (file?.tempFilePath) {
    try {
      await fs.promises.unlink(file.tempFilePath);
    } catch (error) {
      logger.warn({ err: error }, 'Failed to remove temp upload');
    }
  }
};


import WasteReport from '../models/WasteReport.js';
import * as rewardService from './rewardService.js';
import * as litService from './litService.js';
import * as ipfsService from './ipfsService.js';
import * as signProtocolService from './signProtocolService.js';
import * as notificationService from './notificationService.js';

const ACCESS_CONDITIONS = [
  {
    contractAddress: '',
    standardContractType: '',
    chain: 'ethereum',
    method: '',
    parameters: [':userAddress'],
    returnValueTest: {
      comparator: '=',
      value: '0x0',
    },
  },
];

export const createReport = async ({ user, payload }) => {
  const plainData = JSON.stringify(payload);
  const encrypted = await litService.encryptReport({
    data: plainData,
    accessControlConditions: ACCESS_CONDITIONS,
  });

  const cid = await ipfsService.pinJson({
    ciphertext: encrypted.ciphertext,
    metadata: payload,
  });

  const report = await WasteReport.create({
    user: user._id,
    category: payload.category,
    quantity: payload.quantity,
    notes: payload.notes,
    location: payload.location,
    encryptedPayloadCid: cid,
    litResourceId: encrypted.dataToEncryptHash,
    media: payload.media || [],
  });

  const reward = await rewardService.awardReport({ userId: user._id, reportId: report._id });
  const attestation = await signProtocolService.attestActivity({
    schemaId: 'report-schema',
    reference: report._id.toString(),
    data: {
      user: user._id.toString(),
      category: report.category,
      quantity: report.quantity,
    },
  });

  report.attestations.push({
    hash: attestation.attestationId,
    protocolId: attestation.attestationId,
    createdAt: new Date(),
  });
  await report.save();

  await notificationService.notifyUser({
    userId: user._id,
    title: 'Report received',
    body: `Your ${report.category} report is pending verification.`,
    category: 'report',
    metadata: { reportId: report._id },
  });

  return { report, reward };
};

export const updateStatus = async ({ reportId, status, collector }) => {
  const report = await WasteReport.findById(reportId);
  if (!report) throw new Error('Report not found');
  report.status = status;
  if (collector) {
    report.collector = collector;
  }
  await report.save();

  await notificationService.notifyUser({
    userId: report.user,
    title: 'Report updated',
    body: `Your report is now marked as ${status}.`,
    category: 'report',
    metadata: { reportId: report._id, status },
  });

  return report;
};

export const listReports = async (filters = {}) => {
  const query = {};
  if (filters.userId) {
    query.user = filters.userId;
  }
  if (filters.status && filters.status !== 'all') {
    query.status = filters.status;
  }
  if (filters.category && filters.category !== 'all') {
    query.category = filters.category;
  }

  const cursor = WasteReport.find(query)
    .sort('-createdAt')
    .populate('user', 'name rewards');

  if (filters.limit) {
    cursor.limit(filters.limit);
  }

  return cursor;
};


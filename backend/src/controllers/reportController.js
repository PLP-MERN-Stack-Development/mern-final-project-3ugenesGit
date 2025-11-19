import { validationResult } from 'express-validator';
import * as reportService from '../services/reportService.js';
import * as mediaService from '../services/mediaService.js';

const parseJsonField = (value) => {
  if (!value) return null;
  if (typeof value === 'string') {
    try {
      return JSON.parse(value);
    } catch (error) {
      return null;
    }
  }
  return value;
};

export const create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const location = parseJsonField(req.body.location) || req.body.location;
  const quantity = Number(req.body.quantity);

  const photoFile = Array.isArray(req.files?.photo) ? req.files.photo[0] : req.files?.photo;
  let processedMedia = [];
  try {
    if (photoFile) {
      const media = await mediaService.handleUpload(photoFile);
      processedMedia = media ? [media] : [];
    } else if (req.body.photoDataUrl) {
      const media = await mediaService.handleDataUrl(req.body.photoDataUrl);
      processedMedia = media ? [media] : [];
    } else if (req.body.media) {
      try {
        const parsedMedia =
          typeof req.body.media === 'string' ? JSON.parse(req.body.media) : req.body.media;
        processedMedia = Array.isArray(parsedMedia) ? parsedMedia : [parsedMedia];
      } catch (error) {
        processedMedia = [];
      }
    }
  } finally {
    await mediaService.cleanupTempFile(photoFile);
  }

  const payload = {
    category: req.body.category,
    quantity,
    notes: req.body.notes,
    location,
    media: processedMedia,
  };

  const result = await reportService.createReport({ user: req.user, payload });
  res.status(201).json(result);
};

export const mine = async (req, res) => {
  const reports = await reportService.listReports({ userId: req.user._id });
  res.json(reports);
};

export const list = async (req, res) => {
  const reports = await reportService.listReports({
    status: req.query.status,
    category: req.query.category,
  });
  res.json(reports);
};

export const feed = async (req, res) => {
  const reports = await reportService.listReports({ status: 'verified', limit: 200 });
  const sanitized = reports.map((report) => ({
    _id: report._id,
    category: report.category,
    quantity: report.quantity,
    status: report.status,
    location: report.location,
    updatedAt: report.updatedAt,
    rewardValue: report.rewardValue,
  }));
  res.json(sanitized);
};

export const updateStatus = async (req, res) => {
  const { status, collector } = req.body;
  const updated = await reportService.updateStatus({
    reportId: req.params.id,
    status,
    collector,
  });
  res.json(updated);
};


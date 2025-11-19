const { SignProtocolClient, SpMode } = require('@ethsign/sp-sdk');
const config = require('../config/env');
const logger = require('../config/logger');

let client = null;

if (config.signProtocolApiKey) {
  try {
    client = new SignProtocolClient(SpMode.OnChain, {
      apiKey: config.signProtocolApiKey,
    });
  } catch (error) {
    logger.error({ err: error }, 'Failed to initialise Sign Protocol client');
  }
} else {
  logger.warn('SIGN_PROTOCOL_API_KEY missing. Attestations will be mocked.');
}

exports.attestActivity = async (payload) => {
  if (!client) {
    return {
      attestationId: `mock-attestation-${Date.now()}`,
    };
  }

  try {
    const result = await client.createAttestation({
      schemaId: payload.schemaId,
      data: payload.data,
      indexingValue: payload.reference,
    });
    return result;
  } catch (error) {
    logger.error({ err: error }, 'Failed to create attestation, returning mock id');
    return {
      attestationId: `mock-attestation-${Date.now()}`,
    };
  }
};


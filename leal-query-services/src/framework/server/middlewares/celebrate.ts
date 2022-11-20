import { celebrate, errors } from 'celebrate';

const SCHEMA_OPTIONS = { allowUnknown: true, abortEarly: false };

export const validateContract = (contract: any) => {
  return celebrate(contract, SCHEMA_OPTIONS);
};

export const errorOptions = errors();

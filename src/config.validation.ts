import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  AWS_REGION: Joi.string().required(),
  AWS_ACCESS_KEY_ID: Joi.string().required(),
  AWS_SECRET_ACCESS_KEY: Joi.string().required(),
  DYNAMODB_TABLE: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
});

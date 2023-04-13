import Joi from 'joi';

export function addNFTValidation(payload) {
  const schema = Joi.object({
    title: Joi.string().required(),
    image_url: Joi.string().required(),
    category: Joi.string().required(),
    description: Joi.string().required(),
    software: Joi.string(),
    size: Joi.string(),
    nft_format: Joi.string(),
    marketplace_url: Joi.string().required(),
  });
  return schema.validate(payload);
}

export function updateNFTValidation(payload) {
  const schema = Joi.object({
    title: Joi.string().allow('', null),
    image_url: Joi.string().allow('', null),
    category: Joi.string().allow('', null),
    description: Joi.string().allow('', null),
    software: Joi.string().allow('', null),
    size: Joi.string().allow('', null),
    nft_format: Joi.string().allow('', null),
    marketplace_url: Joi.string().allow('', null),
  });
  return schema.validate(payload);
}

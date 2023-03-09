import Joi from 'joi';

export function addNFTValidation(payload) {
  const schema = Joi.object({
    title: Joi.string().required(),
    image: Joi.string().required(),
    category: Joi.string().required(),
    description: Joi.string().required(),
    software: Joi.string().required(),
    size: Joi.string().required(),
    format_nft: Joi.string().required(),
    url: Joi.string().required(),
  });
  return schema.validate(payload);
}

export function updateNFTValidation(payload) {
  const schema = Joi.object({
    title: Joi.string().allow('', null),
    image: Joi.string().allow('', null),
    category: Joi.string().allow('', null),
    description: Joi.string().allow('', null),
    software: Joi.string().allow('', null),
    size: Joi.string().allow('', null),
    format_nft: Joi.string().allow('', null),
    url: Joi.string().allow('', null),
  });
  return schema.validate(payload);
}

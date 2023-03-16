import { nftModel } from '../models/nft.model.js';
import {
  addNFTValidation,
  updateNFTValidation,
} from '../middlewares/nft.validation.js';
import { logger } from '../utils/logger.js';

export async function getNFT(req, res) {
  const query = req.query;
  nftModel.find(query, (err, data) => {
    try {
      logger.info('Success to get nfts');
      res.status(200).json({
        status: 200,
        data: data,
      });
    } catch (error) {
      logger.error(error);
    }
  });
}

export async function addNFT(req, res) {
  const { value } = addNFTValidation(req.body);

  try {
    await nftModel.create(value);
    logger.info('New nft added');
    res.status(201).json({
      message: 'Success to add new NFT',
    });
  } catch (error) {
    logger.error(error);
    res.status(422).json({
      message: 'Please complete all required fields!',
    });
  }
}

export async function getNFTById(req, res) {
  const { id } = req.params;

  try {
    const nft = await nftModel.findOne({ _id: id });
    if (!nft) {
      logger.error('Your nft id is wrong');
      res.status(200).json({
        status: 200,
        message: 'Your nft id is wrong',
      });
    } else {
      logger.info('Success to get a nft');
      res.status(200).json({
        status: 200,
        message: 'nft updated!',
        data: nft,
      });
    }
  } catch (error) {
    logger.error(error);
  }
}

export async function deleteNFT(req, res) {
  const { id } = req.params;

  try {
    const nft = await nftModel.findOneAndDelete({ _id: id });
    if (!nft) {
      logger.error('Your nft id is wrong');
      res.status(200).json({
        message: 'Your nft id is wrong',
      });
    } else {
      logger.info('Success to delete');
      res.status(200).json({
        status: 200,
        message: 'nft deleted',
      });
    }
  } catch (error) {
    logger.error(error);
    res.status(404).json({
      message: 'something wrong',
    });
  }
}

export async function updateNFT(req, res) {
  const { id } = req.params;
  const { value } = updateNFTValidation(req.body);

  try {
    await nftModel.findOneAndUpdate({ _id: id }, value);
    logger.info('nft updated');
    res.status(200).json({
      message: 'Success update a nft',
    });
  } catch (error) {
    logger.error(error);
  }
}

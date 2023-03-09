import { Router } from 'express';
import * as nftController from '../controllers/nft.controller.js';
import { isAuthenticated } from '../controllers/session.controller.js';
import { cache } from '../middlewares/api.cache.js';

export const NftRouter = Router();

NftRouter.get('/', cache('30 minutes'), nftController.getNFT);
NftRouter.get('/:id', cache('30 minutes'), nftController.getNFTById);
NftRouter.post('/', isAuthenticated, nftController.addNFT);
NftRouter.put('/:id', isAuthenticated, nftController.updateNFT);
NftRouter.delete('/:id', isAuthenticated, nftController.deleteNFT);

import { Router } from 'express';
import * as nftController from '../controllers/nft.controller.js';
import { isAuthenticated } from '../controllers/session.controller.js';

const NftRouter = Router();

NftRouter.get('/', nftController.getNFT);
NftRouter.get('/:id', nftController.getNFTById);
NftRouter.post('/', isAuthenticated, nftController.addNFT);
NftRouter.put('/:id', isAuthenticated, nftController.updateNFT);
NftRouter.delete('/:id', isAuthenticated, nftController.deleteNFT);

export default NftRouter
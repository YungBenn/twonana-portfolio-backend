import { Router } from 'express';
import * as nftController from '../controllers/nft.controller.js';
import { isAuthenticated } from '../controllers/session.controller.js';

const NftRouter = Router();

NftRouter.get('/', nftController.getAllNFT);
NftRouter.get('/categories', nftController.getCategories);
NftRouter.get('/:category', nftController.getNFTByCategory);
NftRouter.get('/:category/:title', nftController.getNFTByTitle);
NftRouter.post('/', isAuthenticated, nftController.addNFT);
NftRouter.put('/:id', isAuthenticated, nftController.updateNFT);
NftRouter.delete('/:id', isAuthenticated, nftController.deleteNFT);

export default NftRouter;

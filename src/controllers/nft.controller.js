import { nftModel } from '../models/nft.model.js';
import {
  addNFTValidation,
  updateNFTValidation,
} from '../middlewares/nft.validation.js';

export async function getAllNFT(req, res) {
  try {
    const nft = await nftModel.find();
    if (!nft) {
      res.status(204).json({
        message: "There's no NFT at all",
      });
    } else {
      console.log('Success to get nfts');
      res.status(200).json({
        status: 200,
        data: nft,
      });
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getNFTByCategory(req, res) {
  const { category } = req.params;

  try {
    const nft = await nftModel.find({ category: category }).exec();
    if (!nft) {
      res.status(204).json({
        message: "There's no NFT at all",
      });
    } else {
      console.log('Success to get nfts');
      res.status(200).json({
        status: 200,
        data: nft,
      });
    }
  } catch (error) {
    console.error(error);
  }
}

// export async function addNFT(req, res) {
//   // const { error, value } = addNFTValidation(req.body);

//   // if (error) {
//   //   console.error(error);
//   //   res.status(422).json({
//   //     status: 422,
//   //     message: error,
//   //   });
//   // }
//   try {
//     req.body.countdown_days = req.body.countdown_days * 86400000; // times 1 day
//     await nftModel.create(req.body);
//     console.log('New nft added');
//     res.status(201).json({
//       message: 'Success to add new NFT',
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(422).json({
//       message: 'Please complete all required fields!',
//     });
//   }
// }
export async function addNFT(req, res) {
  const { error, value } = addNFTValidation(req.body);

  if (error) {
    console.error(error);
    res.status(422).json({
      status: 422,
      message: error,
    });
  }
  try {
    const nft = await nftModel.create(value);
    console.log('New nft added');
    res.status(201).json({
      message: 'Success to add new NFT',
      data: nft,
    });
  } catch (error) {
    console.error(error);
    res.status(422).json({
      message: 'Please complete all required fields!',
    });
  }
}

export async function getNFTByTitle(req, res) {
  const { category } = req.params;
  const { title } = req.params;

  try {
    const nft = await nftModel
      .find({ category: category, title: title })
      .exec();
    if (!nft) {
      console.error('Your nft id is wrong');
      res.status(200).json({
        status: 200,
        message: 'Your nft id is wrong',
      });
    } else {
      console.log('Success to get a nft');
      res.status(200).json({
        status: 200,
        data: nft,
      });
    }
  } catch (error) {
    console.error(error);
  }
}

export async function deleteNFT(req, res) {
  const { id } = req.params;

  try {
    const nft = await nftModel.findOneAndDelete({ _id: id });
    if (!nft) {
      console.error('Your nft id is wrong');
      res.status(200).json({
        message: 'Your nft id is wrong',
      });
    } else {
      console.log('Success to delete');
      res.status(200).json({
        status: 200,
        message: 'nft deleted',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(404).json({
      message: 'something wrong',
    });
  }
}

export async function updateNFT(req, res) {
  const { id } = req.params;
  const { error, value } = updateNFTValidation(req.body);

  if (error) {
    console.error(error);
    res.status(422).json({
      status: 422,
      message: error,
    });
  }
  try {
    await nftModel.findOneAndUpdate({ _id: id }, value);
    console.log('nft updated');
    res.status(200).json({
      message: 'Success update a nft',
    });
  } catch (error) {
    console.error(error);
  }
}

export async function getCategories(req, res) {
  try {
    const category = await nftModel.find().distinct('category');
    res.status(200).json(category);
  } catch (error) {
    console.error(error);
  }
}

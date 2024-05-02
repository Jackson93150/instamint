export const ABI = [
  {
    name: 'mint',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [{ internalType: 'string', name: '_tokenURI', type: 'string' }],
    outputs: [],
  },
] as const;

export const LIST_NFT_ABI = [
  {
    name: 'listNft',
    type: 'function',
    stateMutability: 'payable',
    inputs: [
      {
        internalType: 'address',
        name: '_nftContract',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_price',
        type: 'uint256',
      },
    ],
    outputs: [],
  },
] as const;

export const BUY_NFT_ABI = [
  {
    name: 'buyNft',
    type: 'function',
    stateMutability: 'payable',
    inputs: [
      {
        internalType: 'address',
        name: '_nftContract',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256',
      },
    ],
    outputs: [],
  },
] as const;

export const NFT_CONTRACT = '0x089C931F5C813A0d66F08F8D664c197CE00ECe8D';
export const MARKETPLACE_CONTRACT = '0x93Ea89333A410a142bCBFd063ABB448fEccB37a2';

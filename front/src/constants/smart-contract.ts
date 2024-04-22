export const ABI = [
  {
    name: 'mint',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [{ internalType: 'string', name: '_tokenURI', type: 'string' }],
    outputs: [],
  },
] as const;

export const NFT_CONTRACT = '0x089C931F5C813A0d66F08F8D664c197CE00ECe8D';

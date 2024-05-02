import { parseEther } from 'ethers';

export const ethToWeiConverter = (eth: number) => {
  const ethString = eth.toString();
  const wei = parseEther(ethString);
  return wei;
};

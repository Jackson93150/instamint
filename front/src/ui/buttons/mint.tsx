import cx from 'classnames';
import { useEffect, useState } from 'react';

import RedMintLogo from '@/assets/icons/mint-red.png';
import MintLogo from '@/assets/icons/mint.png';
import { NftInterface } from '@/interfaces/nft.interface';
import { getMintStatus, getMints, createOrUpdateMint } from '@/services/api/mint';
import { formatThousand } from '@/utils';

interface Props {
  nft: NftInterface;
  minterId?: number;
}

export const Mint = ({ nft, minterId }: Props) => {
  const [mint, setMint] = useState<number | null>(null);
  const [unmint, setUnmint] = useState<number | null>(null);
  const [status, setStatus] = useState<boolean | null>(null);

  const handleMint = async (mint: boolean) => {
    await createOrUpdateMint({ mint: mint, minterId: minterId ? minterId : nft.minter.id, nftId: nft.id });

    fetchMints(true).then((mint) => {
      setMint(mint.length);
    });
    fetchMints(false).then((mint) => {
      setUnmint(mint.length);
    });
    getStatus().then((mint) => {
      setStatus(mint);
    });
  };

  const fetchMints = async (mint: boolean) => {
    return await getMints({ nft: nft.id, mint: mint });
  };

  const getStatus = async () => {
    return await getMintStatus({ nft: nft.id, minter: minterId ? minterId : nft.minter.id });
  };

  useEffect(() => {
    fetchMints(true).then((mint) => {
      setMint(mint.length);
    });
    fetchMints(false).then((mint) => {
      setUnmint(mint.length);
    });
    getStatus().then((mint) => {
      setStatus(mint);
    });
  });

  return (
    mint !== null &&
    unmint !== null && (
      <div className="gap-1U flex h-fit items-center">
        <div
          className={cx(
            'px-1.5U gap-1U ease flex size-fit cursor-pointer items-center rounded-[10px] border border-white/25 bg-black/25 py-[2px] backdrop-blur-[25px] transition-all duration-300 hover:bg-green-300/20',
            status === true && 'bg-green-300/20'
          )}
          onClick={() => handleMint(true)}
        >
          <span className="text-small text-white">{formatThousand(mint)}</span>
          <img className="h-[10px]" src={MintLogo} alt="mint" />
        </div>
        <div
          className={cx(
            'px-1.5U gap-1U ease flex size-fit cursor-pointer items-center rounded-[10px] border border-white/25 bg-black/25 py-[2px] backdrop-blur-[25px] transition-all duration-300 hover:bg-red-500/20',
            status === false && 'bg-red-500/20'
          )}
          onClick={() => handleMint(false)}
        >
          <span className="text-small text-white">{formatThousand(unmint)}</span>
          <img className="h-[10px]" src={RedMintLogo} alt="red-mint" />
        </div>
      </div>
    )
  );
};

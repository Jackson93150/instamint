import EtherLogo from '@/assets/icons/ether.png';
import RedMintLogo from '@/assets/icons/mint-red.png';
import MintLogo from '@/assets/icons/mint.png';
import { Button } from '@/ui';

interface Props {
  name: string;
  username: string;
  url: string;
  price: string;
  mint: number;
  unmint: number;
}

export const MinterNftCard = ({ name, username, url, price, mint, unmint }: Props) => {
  return (
    <div className="bg-green-card-gradient p-3U gap-2U ease group z-10 flex h-fit min-w-[340px] max-w-[370px] flex-col overflow-hidden rounded-[10px] border border-white/50 transition-all duration-300 hover:shadow-2xl">
      <div className="aspect-square w-full overflow-hidden rounded-[10px]">
        <img
          className="ease size-full cursor-pointer object-cover transition-all duration-500 group-hover:scale-110"
          src={url}
          alt="banner"
        />
      </div>
      <div className="h-20U px-3U py-2U relative flex w-full justify-between overflow-hidden rounded-[10px] border border-white/25 bg-black/25 backdrop-blur-[25px]">
        <div className="gap-2U flex flex-col">
          <div className="gap-1U flex flex-col">
            <span className="text-[16px] font-bold leading-none text-white">{name}</span>
            <span className="text-small leading-none text-white">{username}</span>
          </div>
          <div className="gap-1U flex items-center">
            <img className="h-[25px]" src={EtherLogo} alt="ether" />
            <span className="text-heading leading-none text-white">{price}</span>
          </div>
        </div>
        <div className="gap-1U mt-[-2px] flex">
          <div className="px-1.5U gap-1U flex size-fit cursor-pointer items-center rounded-[10px] border border-white/25 bg-black/25 py-[2px] backdrop-blur-[25px]">
            <span className="text-small text-white">{mint}</span>
            <img className="h-[10px]" src={MintLogo} alt="mint" />
          </div>
          <div className="px-1.5U gap-1U flex size-fit cursor-pointer items-center rounded-[10px] border border-white/25 bg-black/25 py-[2px] backdrop-blur-[25px]">
            <span className="text-small text-white">{unmint}</span>
            <img className="h-[10px]" src={RedMintLogo} alt="red-mint" />
          </div>
        </div>
        <div className="bottom-2U right-3U ease absolute translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Button color="green" content="BUY" size="small" />
        </div>
      </div>
    </div>
  );
};

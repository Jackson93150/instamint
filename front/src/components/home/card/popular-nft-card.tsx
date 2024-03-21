import Mint from '@/assets/icons/mint.png';
import { formatThousand } from '@/utils';

interface Props {
  picture: string;
  name: string;
  minter: string;
  like: number;
}

export const PopularNftCard = ({ picture, name, minter, like }: Props) => {
  return (
    <div className="p-2U gap-2U flex size-fit max-w-[350px] items-center rounded-[15px] border border-white/20 bg-white/5 backdrop-blur-[25px]">
      <div className="h-15U w-15U rounded-full ">
        <img className="size-full rounded-full object-cover" src={picture} alt="" />
      </div>
      <div className="flex flex-col justify-center">
        <span className="text-body leading-none text-white">{name}</span>
        <span className="text-[12px] text-white/50">{minter}</span>
        <div className="gap-1U flex items-center">
          <span className="text-body text-white">{formatThousand(like)}</span>
          <img className="size-[20px]" src={Mint} alt="mint" />
        </div>
      </div>
    </div>
  );
};

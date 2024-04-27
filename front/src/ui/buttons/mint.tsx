import RedMintLogo from '@/assets/icons/mint-red.png';
import MintLogo from '@/assets/icons/mint.png';
import { formatThousand } from '@/utils';

interface Props {
  value: number;
  type: 'mint' | 'unmint';
  onClick?: () => void;
}

export const Mint = ({ value, type, onClick }: Props) => {
  return (
    <div
      className="px-1.5U gap-1U flex size-fit cursor-pointer items-center rounded-[10px] border border-white/25 bg-black/25 py-[2px] backdrop-blur-[25px]"
      onClick={onClick}
    >
      <span className="text-small text-white">{formatThousand(value)}</span>
      <img className="h-[10px]" src={type === 'mint' ? MintLogo : RedMintLogo} alt="red-mint" />
    </div>
  );
};

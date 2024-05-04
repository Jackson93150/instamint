interface Props {
  text: string;
}

export const Chip = ({ text }: Props) => {
  return (
    <div className="px-3U flex size-fit items-center justify-center rounded-full border border-green-400 bg-green-300/20 py-[2px] text-[14px] text-green-400">
      {text}
    </div>
  );
};

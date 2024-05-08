export const formatThousand = (num: number) => {
  if (num > 1000) {
    const simplifiedNum = num / 1000;
    return simplifiedNum.toFixed(1) + 'K';
  } else {
    return num;
  }
};

export const formatType = (type: string): 'image' | 'audio' | 'video' => {
  const category = type.split('/')[0];
  switch (category) {
    case 'image':
      return 'image';
    case 'audio':
      return 'audio';
    case 'video':
      return 'video';
    default:
      return 'image';
  }
};

export const formatEthDecimal = (num: number) => {
  return num.toFixed(2);
};

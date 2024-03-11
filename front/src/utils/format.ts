export const formatThousand = (num: number) => {
  if (num > 1000) {
    const simplifiedNum = num / 1000;
    return simplifiedNum.toFixed(1) + 'K';
  } else {
    return num;
  }
};

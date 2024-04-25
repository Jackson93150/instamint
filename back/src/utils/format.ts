export const formatRowData = (rawData: any) => {
  return rawData.map((row: any) => {
    const transformedRow = {};
    Object.keys(row).forEach((key) => {
      const newKey = key.replace('minter_', '');
      transformedRow[newKey] = row[key];
    });
    return transformedRow;
  });
};

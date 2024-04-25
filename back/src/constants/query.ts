export const countSubQuery = (
  entity: string,
  referenceColumn: string,
  type?: string,
) => {
  return (subQueryBuilder: any) => {
    subQueryBuilder
      .select(`COUNT(DISTINCT ${entity}.id)`, 'count')
      .from(entity, entity)
      .where(`${entity}.${referenceColumn} = minter.id`);
    if (type) {
      subQueryBuilder.andWhere(`${entity}.type = :type`, { type });
    }
    return subQueryBuilder;
  };
};

export interface ISpendPoints {
  spendPoints(userId: string, pointsToDecrease: number): Promise<string>;
}

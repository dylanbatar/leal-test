export interface IAccumalatePoints {
  accumulatePoints(userId: string, price: number): Promise<string>;
}

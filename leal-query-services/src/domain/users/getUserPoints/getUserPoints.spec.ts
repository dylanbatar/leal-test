import { GetUserPoints } from './getUserPoints';

describe('Consult User Points', () => {
  it('Should return the user data', async () => {
    const userId = '1';
    const inMemoryDb = new inMemoryDB();
    const getUserPointsInstance = new GetUserPoints(inMemoryDb);

    const user = await getUserPointsInstance.getUserPoints(userId);
    expect(user);
  });
});

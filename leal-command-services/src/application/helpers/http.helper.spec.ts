import { IUser } from '../../core/users/IUser';
import { BadRequest, ServerError, SuccessRequest } from './http.helper';

describe('HTTP helper', () => {
  describe('SuccesRequest', () => {
    it('should return status code 200 and body with the data', () => {
      const user: IUser = {
        firstName: 'Fake name',
        lastName: 'Fake lastName',
        email: 'fake@email.com',
        points: 0
      };

      const { statusCode, body } = SuccessRequest<IUser>(user);
      expect(statusCode).toEqual(200);
      expect(body).toMatchObject(user);
    });
  });

  describe('BadRequest', () => {
    it('should return status code 400 and body with the error', () => {
      const { statusCode, body } = BadRequest(new Error('Test error'));
      expect(statusCode).toEqual(400);
      expect(body).toEqual('Test error');
    });
  });

  describe('Server Error', () => {
    it('should return status code 400 and body with the error', () => {
      const { statusCode, body } = ServerError('Service down please try more later');
      expect(statusCode).toEqual(500);
      expect(body).toEqual('Service down please try more later');
    });
  });
});

import AWS from 'aws-sdk';
import { IMovement } from '../../../core/movements/IMovement';
import { IUser } from '../../../core/users/IUser';
import { IRepository } from '../../../domain/ports/IRepository';

const documentClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });

export class DynamoDBRead implements IRepository {
  private readonly TABLE = 'Fake_store';
  constructor() {}

  async getPointsByUserId(userId: string): Promise<IUser> {
    const queryParams: AWS.DynamoDB.DocumentClient.QueryInput = {
      TableName: this.TABLE,
      FilterExpression: 'userId = :usr',
      ExpressionAttributeValues: {
        ':usr': userId
      }
    };
    const user = await documentClient.scan(queryParams).promise();
    return user.Items[0] as IUser;
  }

  async getOrderDetailById(orderId: string): Promise<IMovement> {
    const queryParams: AWS.DynamoDB.DocumentClient.QueryInput = {
      TableName: this.TABLE,
      FilterExpression: 'orderId = :ord',
      ExpressionAttributeValues: {
        ':ord': orderId
      }
    };
    const order = await documentClient.scan(queryParams).promise();
    return order.Items[0] as IMovement;
  }

  async sync(data: any): Promise<void> {
    const item: AWS.DynamoDB.DocumentClient.PutItemInput = {
      TableName: this.TABLE,
      Item: {
        ...data
      }
    };
    await documentClient.put(item).promise();
    console.info('database sync');
  }
}

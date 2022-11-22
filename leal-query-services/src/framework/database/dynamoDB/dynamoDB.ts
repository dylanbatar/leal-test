import AWS from 'aws-sdk';
import { randomBytes } from 'crypto';
import { IMovement } from '../../../core/movements/IMovement';
import { IUser } from '../../../core/users/IUser';
import { IRepository } from '../../../domain/ports/IRepository';

const documentClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });

export class DynamoDBRead implements IRepository {
  private readonly TABLE = 'Fake_store';

  async getPointsByUserId(userId: string): Promise<IUser> {
    const queryParams: AWS.DynamoDB.DocumentClient.QueryInput = {
      TableName: this.TABLE,
      FilterExpression: 'userId = :usr and entity = :entity',
      ExpressionAttributeValues: {
        ':usr': userId,
        ':entity': 'user'
      },
      ProjectionExpression: 'id, userId, firstName, lastName, email, points'
    };
    const user = await documentClient.scan(queryParams).promise();
    return user.Items[0] as IUser;
  }

  async getOrderDetailById(orderId: string): Promise<IMovement> {
    const queryParams: AWS.DynamoDB.DocumentClient.QueryInput = {
      TableName: this.TABLE,
      FilterExpression: 'orderId = :ord and entity = :entity',
      ExpressionAttributeValues: {
        ':ord': orderId,
        ':entity': 'order'
      }
    };
    const order = await documentClient.scan(queryParams).promise();
    return order.Items[0] as IMovement;
  }

  async sync(data: any): Promise<void> {
    let params: AWS.DynamoDB.DocumentClient.PutItemInput;
    if (data.type === 'create-order') {
      params = {
        TableName: this.TABLE,
        Item: {
          id: randomBytes(4).toString('hex'),
          ...data
        }
      };
      await documentClient.put(params).promise();
    } else if (data.type === 'update-points') {
      const params: AWS.DynamoDB.DocumentClient.Update = {
        TableName: this.TABLE,
        Key: { id: data.userId },
        UpdateExpression: 'set points = :points',
        ExpressionAttributeValues: {
          ':points': data.points
        }
      };
      await documentClient.update(params).promise();
      console.info('points sync');
    }

    console.info('database sync');
  }
}

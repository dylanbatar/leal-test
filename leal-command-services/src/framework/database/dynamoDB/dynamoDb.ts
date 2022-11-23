import AWS from 'aws-sdk';
import { randomBytes } from 'crypto';

import { IOrder } from '../../../core/orders/IOrder';
import { IUser } from '../../../core/users/IUser';
import { IRepository } from '../../../domain/ports/IRepository';

const documentClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });

export class DynamoDB implements IRepository {
  private readonly TABLE_W = 'Fake_store_writting';

  put(data: any): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async findUserById(userId: string): Promise<IUser> {
    const queryParams: AWS.DynamoDB.DocumentClient.QueryInput = {
      TableName: this.TABLE_W,
      FilterExpression: 'userId = :usr and entity = :entity',
      ExpressionAttributeValues: {
        ':usr': userId,
        ':entity': 'user'
      }
    };
    const user = await documentClient.scan(queryParams).promise();
    return user.Items[0] as IUser;
  }

  async addPoints(userId: string, pointsToAdd: number): Promise<void> {
    const user = await this.findUserById(userId);
    const params: AWS.DynamoDB.DocumentClient.Update = {
      TableName: this.TABLE_W,
      Key: { id: userId },
      UpdateExpression: 'set points = :points',
      ExpressionAttributeValues: {
        ':points': user.points + pointsToAdd
      }
    };

    await documentClient.update(params).promise();
  }

  async decreasePoints(userId: string, pointsToDecrease: number): Promise<void> {
    const user = await this.findUserById(userId);

    const params: AWS.DynamoDB.DocumentClient.Update = {
      TableName: this.TABLE_W,
      Key: { id: userId },
      UpdateExpression: 'set points = :points',
      ExpressionAttributeValues: {
        ':points': user.points - pointsToDecrease
      }
    };

    await documentClient.update(params).promise();
  }

  async createOrder(order: IOrder): Promise<IOrder> {
    const id = randomBytes(4).toString('hex');
    const item: AWS.DynamoDB.DocumentClient.PutItemInput = {
      TableName: this.TABLE_W,
      Item: {
        id,
        userId: order.userId,
        points: order.points,
        entity: 'order',
        orderId: id,
        payMethod: order.payMethod,
        total: order.total,
        listProducts: order.listProducts,
        date: new Date().toString()
      }
    };
    await documentClient.put(item).promise();
    return item.Item as IOrder;
  }
}

import { attribute, table, hashKey, rangeKey } from '@aws/dynamodb-data-mapper-annotations';

@table('users')
export class UserModel {
  // @hashKey()
  // id: string;

  @hashKey()
  username: string;

  @attribute()
  password: string;

  @attribute()
  firstName: string;

  @attribute()
  lastName: string;

  @attribute()
  organization: string;
}

# angular-auth-api

## Run develop

Requirements:

```
- node
- docker-compose
```

Steps: 

```
1. npm i
2. npm run db:docker
3. npm run start:dev
```

DynamoDB local: http://localhost:8000

API endpoint: http://localhost:3000

Swagger (http://localhost:3001/api):

```
npm run swagger
```

## Production
Requirements:

- aws-cli (https://docs.aws.amazon.com/cli/latest/userguide/install-bundle.html)

- serverless-cli (https://serverless.com/)

Start production offline: `npm run sls:offline`

Deploy: 

```
1. npm i
2. aws configuration
3. edit config file (src/shared/config.index.ts)
4. npm run sls:deploy
```

## Add more DB providers, for example MongoDB
### 1. Import MongooseModule into db.module.ts
```javascript
@Module({
  ...
  imports: [
    ...
    MongooseModule.forRoot('mongodb://localhost/madocders'),
    ...
  ],
  ...
})
```

### 2. Create mongoose schema
```javascript
export const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  organization: String,
});
```

### 3. Import UserSchema into db module
```javascript
@Module({
  ...
  imports: [
    ...
    MongooseModule.forRoot('mongodb://localhost/madocders'),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
    ...
  ],
  ...
})
```

### 4. Inject UserModel into service
```javascript
@InjectModel('User') private readonly userModel: Model<UserModel>
```


## Docs
- NestJS (https://nestjs.com/)

- Serverless (https://serverless.com/)

## Process env config
```
JWT_SECRET
AWS_ACCESS_KEY
AWS_ACCESS_SECRET
```
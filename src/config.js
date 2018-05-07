export default {
  region: process.env.AWS_REGION,
  IdentityPoolId: `${process.env.AWS_REGION}:${process.env.AWS_IDENTITY_POOL_ID}`,
  UserPoolId: `${proess.env.AWS_REGION}_${AWS_USER_POOL_ID}`,
  ClientId: process.env.AWS_CLIENT_ID
}

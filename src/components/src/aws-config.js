// src/aws-config.js
import { Amplify } from 'aws-amplify';
 Amplify.configure({
  Auth: {
    identityPoolId: 'YOUR_IDENTITY_POOL_ID', // Your Cognito Identity Pool ID
    region: 'us-east-2', // Your AWS Region
  },
  Storage: {
    AWSS3: {
      bucket: 'cyberinfrap2', // Your S3 Bucket Name
      region: 'us-east-2',
    },
  },
  API: {
    endpoints: [
      {
        name: 'ParticipationAPI',
        endpoint: 'https://vez21xj814.execute-api.us-east-2.amazonaws.com/prod/ParticipationProcessor', // Your API Gateway URL
      },
    ],
  },
});
export default Amplify
import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'myStorage',
  access: (allow) => ({
    'files/*': [
      allow.authenticated.to(['read', 'write'])
    ]
  })
});




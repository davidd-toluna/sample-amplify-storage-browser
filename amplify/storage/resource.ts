import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'myStorage',
  access: (allow) => ({
    'files/*': [
      allow.groups(['admin']).to(['read', 'write', 'delete']),
      allow.authenticated.to(['read'])
    ]
  })
});




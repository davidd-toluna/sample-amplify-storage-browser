import {
  createAmplifyAuthAdapter,
  createStorageBrowser,
} from '@aws-amplify/ui-react-storage/browser';
import '@aws-amplify/ui-react-storage/styles.css';
import './App.css';

import config from '../amplify_outputs.json';
import { Amplify } from 'aws-amplify';
import { Authenticator, Button } from '@aws-amplify/ui-react';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { useEffect, useState } from 'react';

Amplify.configure(config);

const { StorageBrowser } = createStorageBrowser({
  config: createAmplifyAuthAdapter(),
});

function App() {
  const [userRole, setUserRole] = useState<string>('');

  useEffect(() => {
    const getUserRole = async () => {
      try {
        const attributes = await fetchUserAttributes();
        setUserRole(attributes['custom:role'] || 'user');
      } catch (error) {
        console.log('Error fetching user attributes:', error);
      }
    };
    getUserRole();
  }, []);

  return (
    <Authenticator>
      {({ signOut }) => (
        <>
          <div className="header">
            {userRole === 'admin' && <span>Admin Mode</span>}
            <Button onClick={signOut}>Sign out</Button>
          </div>
          <StorageBrowser />
        </>
      )}
    </Authenticator>
  );
}

export default App;

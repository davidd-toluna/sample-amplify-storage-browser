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
import tolunaLogo from './assets/toluna-logo.png';

Amplify.configure(config);

const defaultValue = {
  location: {
    bucket: "amplify-d16psume6rokrn-mai-mystoragebucketd73bc5f9-v8kjevina0dw",
    prefix: "",
    path: "file/",
    permissions: ["get", "list", "write"] as ("get" | "list" | "write" | "delete")[]
  }
};

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
            <div className="header-left">
              <img
                src={tolunaLogo}
                alt="Toluna Logo"
                className="company-logo"
              />
              {userRole === 'admin' && (
                <span className="admin-badge">Admin Mode</span>
              )}
            </div>
            <div className="header-right">
              <Button onClick={signOut}>Sign out</Button>
            </div>
          </div>
          <StorageBrowser defaultValue={defaultValue}/>
        </>
      )}
    </Authenticator>
  );
}

export default App;
import React, { useEffect, useState } from 'react';
import ForgeReconciler, { Text } from '@forge/react';
import { invoke } from '@forge/bridge';

const App = () => {
  const [description, setDescription] = useState('Loading...');
  const issueKey = 'XELA-1'; // ⛔️ Für echten Kontext dynamisch machen!

  useEffect(() => {
    invoke('getIssueDescription', { issueKey }).then(setDescription);
  }, []);

  return (
    <>
      <Text>Issue-Beschreibung:</Text>
      <Text>{description}</Text>
    </>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

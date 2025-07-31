import React, { useEffect, useState } from 'react';
import ForgeReconciler, { Text, Button, Spinner } from '@forge/react';
import { invoke } from '@forge/bridge';

const App = () => {
  const [issues, setIssues] = useState([]);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const projectKey = 'XELA'; // <-- Ersetzen mit PROJEKT KEY!

  useEffect(() => {
    const fetchIssues = async () => {
      const result = await invoke('getIssuesForProject', { projectKey });
      setIssues(result);
    };
    fetchIssues();
  }, []);

  const handleClick = async (issueKey) => {
    setLoading(true);
    const desc = await invoke('getIssueDescription', { issueKey });
    setDescription(desc);
    setLoading(false);
  };

  return (
    <>
      <Text>Wähle einen Issue:</Text>
      {issues.map(issue => (
        <Button key={issue.key} onClick={() => handleClick(issue.key)}>
          {issue.key} - {issue.summary}
        </Button>
      ))}
      {loading && <Spinner />}
      {description && !loading && (
        <>
          <Text variant="heading-sm" style={{ marginTop: '1rem' }}>
            Beschreibung:
          </Text>
          <Text>{description}</Text>
        </>
      )}
    </>
  );
};

ForgeReconciler.render(<App />);

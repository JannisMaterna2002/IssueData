import React, { useEffect, useState } from 'react';
import ForgeReconciler, { Box, Heading, Text, Label, Textfield, HelperMessage, Button, RequiredAsterisk, UserPicker } from '@forge/react';
import { invoke } from '@forge/bridge';

const App = () => {
  const [data, setData] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [issueData, setIssueData] = useState(null);
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const desc = await invoke('getIssueDetails', { issueKey: 'BCM-1160' });
        setDescription(desc);
      } catch (e) {
        console.error('Fetch failed:', e);
      }
    };
    fetchData();
  }, []);



  return (
    <Box padding='space.200' backgroundColor='color.background.discovery'>
      
      <Heading size="xlarge">Hello world!</Heading>
      
      <Text>{description}</Text>

      <Label labelfor="field">Request<RequiredAsterisk /></Label>
      <Textfield id="field" placeholder="Enter your request details" />

      <UserPicker 
        label="Assignee"
        placeholder="Select a user"
        name="user"
        description='You will get directed to the User Profile'
        onChange={(user)=> setSelectedUser(user)}
      />

      <Button appearance="primary">Submit</Button>
    
    </Box>
  );
};


ForgeReconciler.render(
  <App />
);

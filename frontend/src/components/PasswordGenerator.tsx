import { Box, Button, Card, Checkbox, FormControlLabel, FormGroup, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('S4mple!@#');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleGenerate = async () => {
    const response = await axios.post('http://localhost:3000/api/generate-password', {});
    setPassword(response.data);
  }

  return (
    <Box width={'50%'}>
      <Card sx={{ paddingY: 2, paddingX: 3, boxShadow: 4, borderRadius: 3 }}>
        <form onSubmit={handleSubmit}>
          <Stack gap={1} direction={'column'}>
            <Typography fontSize={24} align='center' marginBottom={2}>Pasword Generator</Typography>

            <TextField id='password-length' type='number' placeholder='How long you want it to be?' variant='outlined' />

            <FormGroup>
              <Stack direction={'row'} justifyContent={'space-between'}>
                <FormControlLabel control={<Checkbox defaultChecked />} label="Uppercase" />
                <FormControlLabel control={<Checkbox />} label="Numbers" />
                <FormControlLabel control={<Checkbox />} label="Specials" />
              </Stack>
            </FormGroup>

            <Button onClick={handleGenerate}>Generate</Button>
          </Stack>
        </form>
      </Card>

      <Typography align='center' marginTop={1}>
        {password}
      </Typography>
    </Box >
  );
};

export default PasswordGenerator;

import { Box, Button, Card, Checkbox, FormControlLabel, FormGroup, Stack, TextField, Typography } from '@mui/material';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { toast } from 'sonner';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('S4mple!@#');
  const [length, setLength] = useState(8);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      length,
      includeUppercase,
      includeNumbers
    };
    try {
      const response = await axios.post('http://localhost:3000/api/generate-password', data);
      setPassword(response.data);
    } catch (error: unknown) {
      if (error instanceof AxiosError) toast(error.response?.data);
      else toast('Unkown error');
    }
  };

  return (
    <Box width={'50%'}>
      <Card sx={{ paddingY: 2, paddingX: 3, boxShadow: 4, borderRadius: 3 }}>
        <form onSubmit={handleSubmit}>
          <Stack gap={1} direction={'column'}>

            <Typography
              fontSize={24}
              align='center'
              marginBottom={2}>Pasword Generator</Typography>

            <TextField
              id='password-length'
              type='number'
              variant='outlined'
              placeholder='How long you want it to be?'
              onChange={e => setLength(parseInt(e.target.value))} />

            <FormGroup>
              <Stack direction={'row'} justifyContent={'space-between'}>
                <FormControlLabel
                  label="Uppercase"
                  control={
                    <Checkbox
                      checked={includeUppercase}
                      onChange={() => setIncludeUppercase(!includeUppercase)} />} />

                <FormControlLabel
                  label="Numbers"
                  control={<Checkbox
                    checked={includeNumbers}
                    onChange={() => setIncludeNumbers(!includeNumbers)} />} />

                <FormControlLabel control={<Checkbox />} label="Specials" />
              </Stack>
            </FormGroup>

            <Button type='submit'>Generate</Button>

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

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box, Button, Card, Checkbox, FormControlLabel, FormGroup, IconButton, Slider, Stack, Typography } from '@mui/material';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { toast } from 'sonner';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('S4mple!@#');
  const [length, setLength] = useState(8);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSpecials, setIncludeSpecials] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      length,
      includeUppercase,
      includeNumbers,
      includeSpecials
    };
    try {
      setIsLoading(true);
      const response = await axios.post('http://localhost:3000/api/generate-password', data);
      setIsLoading(false);
      setPassword(response.data);
    } catch (error: unknown) {
      setIsLoading(false);
      if (error instanceof AxiosError) toast(error.response?.data);
      else toast('Unkown error');
    }
  };

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(password);
      toast('Password copied to clipboard');
    } catch (error) {
      toast('Error copying to clipboard');
    }
  }

  return (
    <Box minWidth={'300px'} maxWidth={'400px'} overflow={'scroll'} padding={2}>
      <Card sx={{ paddingY: 2, paddingX: 3, boxShadow: 4, borderRadius: 3 }}>
        <form onSubmit={handleSubmit}>
          <Stack gap={1} direction={'column'}>

            <Typography
              fontSize={24}
              align='center'
              marginBottom={2}>Pasword Generator</Typography>

            <Typography>
              Length
            </Typography>

            <Slider
              defaultValue={length}
              onChange={(_, value) => setLength(Number(value))}
              min={1}
              aria-label="Length"
              valueLabelDisplay="auto" />

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

                <FormControlLabel
                  label="Specials"
                  control={<Checkbox
                    checked={includeSpecials}
                    onChange={() => setIncludeSpecials(!includeSpecials)} />} />

              </Stack>
            </FormGroup>

            <Stack direction={'row'} justifyContent={'space-between'}>
              <Button
                fullWidth
                type='submit'
                variant='contained'
                disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Generate'}
              </Button>

              <IconButton onClick={() => handleCopy()}>
                <ContentCopyIcon />
              </IconButton>
            </Stack>

          </Stack>
        </form>
      </Card>

      <Typography
        align='center'
        marginTop={1}
        overflow={'auto'}
        sx={{ wordBreak: 'break-all' }}>
        {password}
      </Typography>

    </Box >
  );
};

export default PasswordGenerator;

import { Box, Button, Card, Checkbox, FormControlLabel, FormGroup, Stack, TextField, Typography } from '@mui/material';

const PasswordGenerator = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Box width={'50%'}>
      <Card sx={{padding: 1, boxShadow: 4}}>
        <form onSubmit={handleSubmit}>
          <Stack gap={1} direction={'column'}>
            <Typography fontSize={24} align='center' marginBottom={2}>Pasword Generator</Typography>

            <TextField id='password-length' type='number' placeholder='How long you want it to be?' variant='outlined' />

            <FormGroup>
              <Stack direction={'row'}>
                <FormControlLabel control={<Checkbox defaultChecked />} label="Uppercase" />
                <FormControlLabel control={<Checkbox />} label="Numbers" />
                <FormControlLabel control={<Checkbox />} label="Specials" />
              </Stack>
            </FormGroup>

            <Button>Generate</Button>
          </Stack>
        </form>
      </Card>

      <Typography align='center' marginTop={1}>
        S4mple!@#
      </Typography>
    </Box >
  );
};

export default PasswordGenerator;

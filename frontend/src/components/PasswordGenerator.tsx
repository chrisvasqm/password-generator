import { Box, Button, Card, CheckboxGroup, Flex, Heading, TextField } from '@radix-ui/themes';
import React from 'react';

const PasswordGenerator = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Box width={'40%'}>
      <Card>
        <form onSubmit={handleSubmit}>
          <Flex gap={'2'} direction={'column'}>
            <Heading>Pasword Generator</Heading>
            <TextField.Root placeholder='How long should it be?'>
              <TextField.Slot></TextField.Slot>
            </TextField.Root>
            <CheckboxGroup.Root defaultValue={['']} name='example'>
              <Flex justify={'center'} gap={'6'}>
                <CheckboxGroup.Item value='1'>Uppercase</CheckboxGroup.Item>
                <CheckboxGroup.Item value='2'>Numbers</CheckboxGroup.Item>
                <CheckboxGroup.Item value='3'>Specials</CheckboxGroup.Item>
              </Flex>
            </CheckboxGroup.Root>
            <Button>Generate</Button>
          </Flex>
        </form>
      </Card>

      <Heading mt={'2'} align={'center'}>
        S4mple!@#
      </Heading>
    </Box>
  );
};

export default PasswordGenerator;

import { Flex } from '@radix-ui/themes';
import PasswordGenerator from './components/PasswordGenerator';

function App() {
  return (
    <Flex justify={'center'} align={'center'} height={'80vh'}>
      <PasswordGenerator />
    </Flex>
  )
}

export default App

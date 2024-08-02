import { Container } from '@mui/material';
import PasswordGenerator from './components/PasswordGenerator';

function App() {
  return (
    <Container sx={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <PasswordGenerator />
    </Container>
  )
}

export default App

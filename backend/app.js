import 'dotenv/config';
import 'express-async-errors';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import passwordGenerator from './routes/password-generator.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use('/api/generate-password', passwordGenerator);

app.use((error, request, response, next) => {
  console.error(error.stack);

  response.status(500).send('Something went wrong. Try again later');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is listening on http://localhost:${PORT}`));
import 'dotenv/config';
import 'express-async-errors';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import passwordGenerator from './routes/password-generator.js';
import errorMiddleware from './middlewares/errorMiddleware.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use('/api/generate-password', passwordGenerator);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is listening on http://localhost:${PORT}`));
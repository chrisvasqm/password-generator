import { Router } from 'express';
import { z } from 'zod';
import { generate } from '../services/password-service.js';

const schema = z.object({
  length: z.number().positive().optional(),
  includeUppercase: z.boolean().optional(),
  includeNumbers: z.boolean().optional(),
  includeSpecials: z.boolean().optional()
});

const router = Router();

router.post('/', (request, response) => {
  const validation = schema.safeParse(request.body);
  if (!validation.success) return response.status(400).send(validation.error.format());

  const { length, includeUppercase, includeNumbers, includeSpecials } = request.body;

  const passwordLength = length ?? 8;

  const password = generate(
    passwordLength,
    includeUppercase,
    includeNumbers,
    includeSpecials
  );

  response.send(password);
});

export default router;
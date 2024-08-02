import { Router } from 'express';
import { z } from 'zod';
import { generate } from '../services/password-service.js';

const schema = z.object({
  length: z.number({ invalid_type_error: 'length must be a number' }).positive({ message: 'length must be a positive number' }).optional(),
  includeUppercase: z.boolean({ invalid_type_error: "includeUppercase must be a boolean" }).optional(),
  includeNumbers: z.boolean({ invalid_type_error: "includeUppercase must be a boolean" }).optional(),
  includeSpecials: z.boolean({ invalid_type_error: "includeUppercase must be a boolean" }).optional()
});

const router = Router();

router.post('/', (request, response) => {
  const validation = schema.safeParse(request.body);
  if (!validation.success) return response.status(400).send(validation.error.errors[0].message);

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
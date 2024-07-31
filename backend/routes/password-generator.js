import { Router } from 'express';
import { z } from 'zod';

const upperCases = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const specials = '!@#$%^&*()_+~`|}{[]\\:;?><,./-=';

const schema = z.object({
  length: z.number().positive().optional(),
  hasUppercase: z.boolean().optional(),
  hasNumbers: z.boolean().optional(),
  hasSpecials: z.boolean().optional()
});

const router = Router();

router.post('/', (request, response) => {
  const validation = schema.safeParse(request.body);
  if (!validation.success) return response.status(400).send(validation.error.format());

  const { length, hasUppercase, hasNumbers, hasSpecials } = request.body;

  const passwordLength = length ?? 8;

  let password = '';

  let allChars = lowerCase;

  // Ensure at least one character from each set is included
  if (hasUppercase) {
    allChars += upperCases;
    password += upperCases[Math.floor(Math.random() * upperCases.length)];
  }

  if (hasNumbers) {
    allChars += numbers;
    password += numbers[Math.floor(Math.random() * numbers.length)];
  }

  if (hasSpecials) {
    allChars += specials;
    password += specials[Math.floor(Math.random() * specials.length)];
  }

  // Fill the rest of the password length with random characters from all sets
  for (let i = password.length; i < passwordLength; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }
  // Shuffle the password to ensure the first four characters aren't predictable
  password = password.split('').sort(() => 0.5 - Math.random()).join('');

  response.send(password);
});

export default router;
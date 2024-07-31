import { Router } from 'express';
import { z } from 'zod';

const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const special = '!@#$%^&*()_+~`|}{[]\\:;?><,./-=';

const schema = z.object({
  length: z.number().positive().optional(),
  hasUppercase: z.boolean().optional(),
  hasLowercase: z.boolean().optional(),
  hasNumbers: z.boolean().optional()
});

const router = Router();

router.post('/', (request, response) => {
  const validation = schema.safeParse(request.body);
  if (!validation.success) return response.status(400).send(validation.error.format());

  const { length, hasUppercase, hasLowercase, hasNumbers } = request.body;

  const passwordLength = length ?? 8;

  let password = '';

  const allChars =
    hasUppercase ? upperCase : undefined
      + hasLowercase ? lowerCase : undefined
        + hasNumbers ? numbers : undefined
    + special;

  // Ensure at least one character from each set is included
  if (hasUppercase)
    password += upperCase[Math.floor(Math.random() * upperCase.length)];

  if (hasLowercase)
    password += lowerCase[Math.floor(Math.random() * lowerCase.length)];

  if (hasNumbers)
    password += numbers[Math.floor(Math.random() * numbers.length)];

  password += special[Math.floor(Math.random() * special.length)];

  // Fill the rest of the password length with random characters from all sets
  for (let i = password.length; i < passwordLength; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }
  // Shuffle the password to ensure the first four characters aren't predictable
  password = password.split('').sort(() => 0.5 - Math.random()).join('');

  response.send(password);
});

export default router;
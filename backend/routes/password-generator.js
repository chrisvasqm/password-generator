import { Router } from 'express';

const router = Router();

router.post('/', (request, response) => {
  const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const special = '!@#$%^&*()_+~`|}{[]\\:;?><,./-=';
  const allChars = upperCase + lowerCase + numbers + special;

  let password = '';

  // Ensure at least one character from each set is included
  password += upperCase[Math.floor(Math.random() * upperCase.length)];
  password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += special[Math.floor(Math.random() * special.length)];

  // Fill the rest of the password length with random characters from all sets
  for (let i = password.length; i < allChars.length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }
  // Shuffle the password to ensure the first four characters aren't predictable
  password = password.split('').sort(() => 0.5 - Math.random()).join('');

  response.send(password);
});

export default router;
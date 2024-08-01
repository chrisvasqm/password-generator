const upperCases = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerCases = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const specials = '!@#$%^&*()_+~`|}{[]\\:;?><,./-=';

export function generate(length = 8, includeUppercase = false, includeNumbers = false, includeSpecials = false) {
  let password = '';

  let allChars = lowerCases;

  // Ensure at least one character from each set is included
  if (includeUppercase) {
    allChars += upperCases;
    password += upperCases[Math.floor(Math.random() * upperCases.length)];
  }

  if (includeNumbers) {
    allChars += numbers;
    password += numbers[Math.floor(Math.random() * numbers.length)];
  }

  if (includeSpecials) {
    allChars += specials;
    password += specials[Math.floor(Math.random() * specials.length)];
  }

  // Fill the rest of the password length with random characters from all sets
  for (let i = password.length; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }
  // Shuffle the password to ensure the first four characters aren't predictable
  password = password.split('').sort(() => 0.5 - Math.random()).join('');

  return password;
}
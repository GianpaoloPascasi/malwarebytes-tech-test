import { randomInt } from 'crypto';

const dictionary =
  'qwertyuiopasdfghjklzxcvbnm0123456789QWERTYUIOPASDFGHJKLZXCVBNM';
export function randomSalt(len: number): string {
  let salt = '';
  for (let i = 0; i < len; i++) {
    salt += dictionary[randomInt(dictionary.length)];
  }
  return salt;
}

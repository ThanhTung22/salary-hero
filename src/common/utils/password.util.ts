import * as bcrypt from 'bcrypt';

export async function comparePasswordHash(
  plainPassword,
  passwordHash,
): Promise<boolean> {
  return bcrypt.compare(plainPassword, passwordHash);
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

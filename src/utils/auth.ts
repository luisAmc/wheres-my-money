import SecurePassword from 'secure-password';
import { ValidationError } from '~/graphql/errors';
import { db } from './prisma';

const securePassword = new SecurePassword();

export async function hashPassword(password: string) {
  return await securePassword.hash(Buffer.from(password));
}

export async function verifyPassword(hashedPassword: Buffer, password: string) {
  try {
    return await securePassword.verify(Buffer.from(password), hashedPassword);
  } catch (error) {
    console.log(error);
    return SecurePassword.INVALID;
  }
}

export async function authenticateUser(email: string, password: string) {
  const user = await db.user.findFirst({
    where: { email: { equals: email, mode: 'insensitive' } }
  });

  if (!user || !user.hashedPassword) {
    throw new ValidationError('Correo no encontrado.', {
      email: 'Correo no encontrado.'
    });
  }

  const passwordStatus = await verifyPassword(user.hashedPassword, password);

  switch (passwordStatus) {
    case SecurePassword.VALID:
      break;

    case SecurePassword.VALID_NEEDS_REHASH:
      const improvedHash = await hashPassword(password);

      await db.user.update({
        where: { id: user.id },
        data: { hashedPassword: improvedHash }
      });

      break;

    default:
      throw new ValidationError('Contraseña incorrecta.', {
        password: 'La contraseña es incorrecta.'
      });
  }

  return user;
}

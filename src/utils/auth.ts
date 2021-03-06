import SecurePassword from 'secure-password';
import { ValidationError } from 'yup';
import User from '~/models/User';
import dbConnect from './dbConnect';

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
  await dbConnect();

  const user = await User.findOne({ email });

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
      await User.updateOne({ _id: user._id }, { hashedPassword: improvedHash });
      break;

    default:
      throw new ValidationError('Contraseña incorrecta.', {
        password: 'La contraseña es incorrecta.'
      });
  }

  return user;
}

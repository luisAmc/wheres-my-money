import { authenticateUser, hashPassword } from '~/utils/auth';
import { db } from '~/utils/prisma';
import {
  createSession,
  NextIronRequest,
  removeSession
} from '~/utils/sessions';
import { builder } from '../builder';
import { Result } from './ResultResolver';
import { UserObject } from './UserResolver';

builder.queryField('me', (t) =>
  t.field({
    type: UserObject,
    nullable: true,
    resolve: (_root, _args, { user }) => {
      return user;
    }
  })
);

builder.mutationField('logout', (t) =>
  t.field({
    type: Result,
    resolve: async (_root, _args, { req, session }) => {
      await removeSession(req, session);
      return Result.SUCCESS;
    }
  })
);

const LoginInput = builder.inputType('LoginInput', {
  fields: (t) => ({
    email: t.string({ validate: { email: true } }),
    password: t.string({ validate: { minLength: 6 } })
  })
});

builder.mutationField('login', (t) =>
  t.field({
    type: UserObject,
    // The parent auth scope (for the Mutation type) is for authenticated users,
    // so we will need to skip it.
    skipTypeScopes: true,
    authScopes: {
      unauthenticated: true
    },
    args: {
      input: t.arg({ type: LoginInput })
    },
    resolve: async (_root, { input }, { req }) => {
      const user = await authenticateUser(input.email, input.password);
      await createSession(req as NextIronRequest, user);
      return user;
    }
  })
);

const SignUpInput = builder.inputType('SignUpInput', {
  fields: (t) => ({
    name: t.string({
      validate: {
        minLength: 1,
        maxLength: 100
      }
    }),
    email: t.string({
      validate: {
        email: true
      }
    }),
    password: t.string({
      validate: {
        minLength: 6
      }
    })
  })
});

builder.mutationField('signUp', (t) =>
  t.field({
    type: UserObject,
    // The parent auth scope (for the Mutation type) is for authenticated users,
    // so we will need to skip it.
    skipTypeScopes: true,
    authScopes: {
      unauthenticated: true
    },
    args: {
      input: t.arg({ type: SignUpInput })
    },
    resolve: async (_root, { input }, { req }) => {
      const user = await db.user.create({
        data: {
          name: input.name,
          email: input.email,
          hashedPassword: await hashPassword(input.password)
        }
      });

      await createSession(req as NextIronRequest, user);

      return user;
    }
  })
);

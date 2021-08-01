import { User } from '@prisma/client';
import { builder } from '../builder';

export const UserObject = builder.objectRef<User>('User');

UserObject.implement({
  fields: (t) => ({
    id: t.exposeID('id', {}),
    name: t.exposeString('name', {})
  })
});

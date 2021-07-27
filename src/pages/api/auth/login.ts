import { authenticateUser } from '~/utils/auth';
import dbConnect from '~/utils/dbConnect';
import withSession, { createSession } from '~/utils/sessions';

export default withSession(async (req, res) => {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const data = req.body;

        const user = await authenticateUser(data.email, data.password);

        await createSession(req, user);

        res.json(user);
      } catch (err) {
        res.status(400).json(err.message);
      }

      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
});

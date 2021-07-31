import dbConnect from '~/utils/dbConnect';
import withSession, {
  removeSession
} from '~/utils/sessions';

export default withSession(async (req, res) => {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'POST': {
      try {
        await removeSession(req);
        return res.json({ success: true });
      } catch (err) {
        return res.status(400).json(err.message);
      }
    }

    default:
      return res.status(400).json({ success: false });
  }
});

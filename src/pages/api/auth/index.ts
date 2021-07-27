import Session from '~/models/Session';
import dbConnect from '~/utils/dbConnect';
import withSession, {
  IRON_SESSION_ID_KEY,
  removeSession
} from '~/utils/sessions';

export default withSession(async (req, res) => {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET': {
      try {
        const session = await Session.findOne({
          _id: req.session.get(IRON_SESSION_ID_KEY)
        })
          .populate('user', 'name email')
          .lean();

        return res.json({ me: session.user });
      } catch (err) {
        return res.status(400).json(err.message);
      }
    }

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

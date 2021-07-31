import Session from '~/models/Session';
import Transaction from '~/models/Transaction';
import dbConnect from '~/utils/dbConnect';
import withSession, { IRON_SESSION_ID_KEY } from '~/utils/sessions';

export default withSession(async (req, res) => {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET': {
      try {
        const session = await Session.findOne(
          { _id: req.session.get(IRON_SESSION_ID_KEY) },
          'user'
        ).populate('user', '_id email');

        const transactions = await Transaction.find({ user: session.user._id });

        return res.json({ success: true, transactions });
      } catch (err) {
        return res.status(400).json(err.message);
      }
    }

    case 'POST': {
      try {
        const session = await Session.findOne(
          { _id: req.session.get(IRON_SESSION_ID_KEY) },
          'user'
        ).populate('user', '_id email');

        const data = req.body;

        await Transaction.create({ ...data, user: session.user._id });

        return res.json({ success: true });
      } catch (err) {
        return res.status(400).json(err.message);
      }
    }

    default:
      return res.status(400).json({ success: false });
  }
});

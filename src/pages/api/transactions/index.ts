import { endOfDay, endOfMonth, startOfDay, startOfMonth } from 'date-fns';
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
        const currentDate = new Date();

        const dateFilters = {
          start: req.query.start
            ? startOfDay(new Date(req.query.start as string))
            : startOfMonth(currentDate),
          end: req.query.end
            ? endOfDay(new Date(req.query.end as string))
            : endOfMonth(currentDate)
        };

        const session = await Session.findOne(
          { _id: req.session.get(IRON_SESSION_ID_KEY) },
          'user'
        ).populate('user', '_id email');

        const transactions = await Transaction.find({
          user: session.user._id,
          date: { $gte: dateFilters.start, $lte: dateFilters.end }
        }).sort({ createdAt: -1 });

        // TODO: Refactor this, maybe with aggregations
        const incomesByCategory = new Map();
        const expensesByCategory = new Map();

        let [incomes, expenses] = [0, 0];
        for (const transaction of transactions) {
          if (transaction.type === 'income') {
            incomes += transaction.amount;

            const total = incomesByCategory.get(transaction.category) ?? 0;

            incomesByCategory.set(
              transaction.category,
              total + transaction.amount
            );
          } else {
            expenses += transaction.amount;

            const total = expensesByCategory.get(transaction.category) ?? 0;

            expensesByCategory.set(
              transaction.category,
              total + transaction.amount
            );
          }
        }

        return res.json({
          success: true,
          transactions,
          incomes: {
            total: incomes,
            byCategory: Array.from(incomesByCategory)
          },
          expenses: {
            total: expenses,
            byCategory: Array.from(expensesByCategory)
          }
        });
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

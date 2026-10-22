import express from 'express';
import cors from 'cors';
import { db } from './database.js';

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(cors());
app.use(express.json());

const ACTIVITY_TYPES = [
  'Food',
  'Social',
  'Physical',
  'Career',
  'Education',
] as const;

// Get all entries (with optional filter)
app.get('/api/entries', async (req, res) => {
  try {
    let query = db.selectFrom('journal_entries').selectAll();

    const activityType = req.query.activity_type as string | undefined;
    if (activityType && ACTIVITY_TYPES.includes(activityType as any)) {
      query = query.where('activity_type', '=', activityType);
    }

    const entries = await query.orderBy('date', 'desc').execute();
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch entries', reason: JSON.stringify(error) });
    console.error(error)
  }
});

// Create a new entry
app.post('/api/entries', async (req, res) => {
  try {
    const { date, activity_type, description } = req.body;

    if (!date || !activity_type || !description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!ACTIVITY_TYPES.includes(activity_type)) {
      return res.status(400).json({ error: 'Invalid activity type' });
    }

    const result = await db
      .insertInto('journal_entries')
      .values({ date, activity_type, description })
      .returningAll()
      .executeTakeFirstOrThrow();

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create entry' });
  }
});

// Delete an entry
app.delete('/api/entries/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    const result = await db
      .deleteFrom('journal_entries')
      .where('id', '=', id)
      .executeTakeFirst();

    if (result.numDeletedRows === BigInt(0)) {
      return res.status(404).json({ error: 'Entry not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete entry' });
  }
});

// Get activity types
app.get('/api/activity-types', (_req, res) => {
  res.json(ACTIVITY_TYPES);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

import express from 'express';
import cors from 'cors';
import { Telegraf } from 'telegraf';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const bot = new Telegraf(process.env.API_KEY);

app.post('/feedback', (req, res) => {
  const message = `New feedback:\n*Name:* ${req.body.name}\n*Email:* ${req.body.email}\n*Message:* ${req.body.message}`;

  bot.telegram.sendMessage(process.env.CHAT_ID, message, { parse_mode: 'Markdown' });

  res.send('Feedback sent!');
});

bot.launch();

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import chalk from 'chalk';
import path from 'path';

const PORT = process.env.PORT ?? 8080;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (process.env.HEROKU) {
  const clientRoot = path.resolve(__dirname, '../client/dist');
  const clientIndex = path.resolve(clientRoot, 'index.html');

  app.use(express.static(clientRoot));
  app.use('*', (req, res) => {
    res.sendFile(clientIndex);
  });
}

app.listen(PORT, () => {
  console.log(chalk.green(`Server is running on PORT: ${chalk.bold(PORT)}`));
});

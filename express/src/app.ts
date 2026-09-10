import express, { Request, Response } from 'express';
import router from './stars/stars.routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(router)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

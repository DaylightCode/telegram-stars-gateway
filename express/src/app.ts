import express, { Express, Request, Response, NextFunction  } from 'express';
import router from './stars/stars.routes';
import { requireApiKey } from './middleware/apiKey';

if (!process.env.INTERNAL_API_KEY) {
  throw new Error('INTERNAL_API_KEY is not set');
}

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world');
});


app.use(requireApiKey)
app.use(router)


app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Invalid JSON body' });
  }

  res.status(err.status || 500).json({ error: 'Internal server error' });
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
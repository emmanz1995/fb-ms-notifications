import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const options = {
  origin: '*'
}

app.use(cors(options));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send({
    message: 'Notifications Service'
  });
});

export default app;

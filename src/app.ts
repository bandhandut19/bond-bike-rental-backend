import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './app/routes';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import cookieParser from 'cookie-parser';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors({ origin: ['http://localhost:5173'] }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api', router);
app.use(notFound);
app.use(globalErrorHandler);
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Bond Bike Rentals');
});

export default app;

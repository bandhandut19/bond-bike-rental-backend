import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './app/routes';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import cookieParser from 'cookie-parser';

const app: Application = express();

const corsOptions = {
  origin: 'http://localhost:5173', // Allow only this origin
  // origin: 'https://bond-bike-rental-frontend.vercel.app', // Allow only this origin
  credentials: true, // Allow credentials (cookies, authorization headers)
};

// Set up middleware
app.use(cors(corsOptions)); // Preflight handling is automatically done by the cors middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  // res.header(
  //   'Access-Control-Allow-Origin',
  //   'https://bond-bike-rental-frontend.vercel.app',
  // );
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  next();
});

app.use('/api', router);
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Bond Bike Rentals');
});

// Error handling middlewares
app.use(notFound);
app.use(globalErrorHandler);

export default app;

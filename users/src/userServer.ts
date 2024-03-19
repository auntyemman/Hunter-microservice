import express, { Request, Response, Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from 'dotenv';
import 'reflect-metadata';

import { mongoDBConnection } from './config/mongodb.config';
import { errorHandler } from './utils/errorHandler';
import { auth } from './route/user.routes';

config();
export const app: Application = express();
const PORT = process.env.PORT || 3232;

/*----------------------------app scripts--------------------------------------------------------------*/
mongoDBConnection();
/*----------------------------app level middlewares-----------------------------------------------------*/
app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(errorHandler);
/*----------------------------app routes-----------------------------------------------------------------*/
app.use('/api/v1', auth);
/*----------------------------app server url-------------------------------------------------------------*/
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Welcome to the Hunter API',
  });
});
app.get('*', (req: Request, res: Response) => {
  res.status(404).json({ message: 'route not found in this domain' });
});
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
process.on('uncaughtException', (err) => {
  console.log(err);
  process.exit(1);
});

import express from 'express';
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import ExpressMongoSanitize from 'express-mongo-sanitize';

const app = express();
const port = 3000;

import db from './utils/db.js';
import authRouter from './routes/authRouter.js';
import productRouter from './routes/productRouter.js';
import orderRouter from './routes/orderRouter.js';

// Middleware
app.use(express.json());
app.use(helmet());
app.use(ExpressMongoSanitize());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

// Parent Router
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/order', orderRouter);

app.use(notFound);
app.use(errorHandler);

// Server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

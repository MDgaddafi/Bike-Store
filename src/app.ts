import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bikeRoutes from './app/routes/bikeRoutes';
import orderRoutes from './app/routes/orderRoutes';

const app: Application = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/products', bikeRoutes);
app.use('/api/orders', orderRoutes);

// Error Handling Middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    message: err.message,
    success: false,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
});

export default app;

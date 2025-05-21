import express, { Request, Response, NextFunction } from 'express';
import productRouter from './routes/product.routes';
import categoryRouter from './routes/category.routes';
import orderRouter from './routes/order.routes';
import userRouter from './routes/user.routes';

const app = express();
app.use(express.json());

// Routers
app.use('/api/products', productRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/orders', orderRouter);
app.use('/api/users', userRouter);

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Not Found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

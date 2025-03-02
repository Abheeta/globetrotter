import express, { Express, Request, Response, NextFunction } from 'express';
import cors from "cors";
import questionRoutes from './routes/questionRoutes';
import userRoutes from './routes/userRoutes';

// Create Express application
const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the globetrotter backend');
});

app.use("/question", questionRoutes);
app.use("/user", userRoutes);

// Error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

export default app;
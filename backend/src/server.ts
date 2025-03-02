import mongoose from 'mongoose';
import app from './app';
import config from './config';

// Define port
const PORT: number = config.port;

// Connect to MongoDB
mongoose
  .connect(config.mongoUrl)
  .then(() => {
    console.log('Connected to MongoDB');
    startServer();
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:');
    console.error(error);
  });

// Only start server if MongoDB connects
const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

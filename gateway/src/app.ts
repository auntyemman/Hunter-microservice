
import express from 'express';
import { userRouter } from './routes/userRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON bodies
app.use(express.json());

// Routes
app.use('/api/users', userRouter);

app.listen(PORT, () => {
    console.log(`Gateway server is running on port ${PORT}`);
});
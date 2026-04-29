import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import collegeRoutes from './routes/colleges';
import favoriteRoutes from './routes/favorites';
import compareRoutes from './routes/compare';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/colleges', collegeRoutes);
app.use('/favorites', favoriteRoutes);
app.use('/compare', compareRoutes);

app.get('/', (req, res) => {
  res.send('Campus Compare API is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

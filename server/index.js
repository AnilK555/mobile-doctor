import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import accessoryRoutes from './routes/accessory.js';

const app = express();
app.use((req, res, next) => {
  console.log('Initial URL:', req.originalUrl);
  console.log('Initial query:', req.query);
  next();
});
app.use(cors());
app.use(express.json());

const MONGO_URI = 'mongodb+srv://anilk:Anilmongo555@mobile-doctor.fryj5mw.mongodb.net/?retryWrites=true&w=majority&appName=mobile-doctor';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

app.use('/api/auth', authRoutes);
app.use('/api/accessories', accessoryRoutes);


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

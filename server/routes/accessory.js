// ...existing code...
import express from 'express';
import Accessory from '../models/Accessory.js';
import jwt from 'jsonwebtoken';
import cloudinary from '../cloudinary.js';

const router = express.Router();
const JWT_SECRET = 'your_jwt_secret';

// Middleware to check auth
function authMiddleware(req, res, next) {
    console.log('Auth middleware triggered',req.query);
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// Get all accessories
router.get('/', authMiddleware, async (req, res) => {
  const { color, brand, type } = req.query;

  const filter = {};
  if (brand) filter.brand = brand;
  if (type) filter.type = type;
  if (color) filter.color = color;
  try {
    const accessories = await Accessory.find(filter);
    res.json(accessories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new accessory
router.post('/', authMiddleware, async (req, res) => {
  try {
    let imageUrl = req.body.image;
    // If image is base64, check size before upload
    if (imageUrl && imageUrl.startsWith('data:image')) {
      // Extract base64 string and check size
      const base64Data = imageUrl.split(',')[1];
      const imageSizeBytes = Math.ceil(base64Data.length * 3 / 4);
      if (imageSizeBytes > 1024 * 1024) {
        return res.status(400).json({ error: 'Image size must be less than 1MB.' });
      }
      const uploadRes = await cloudinary.uploader.upload(imageUrl, {
        folder: 'accessories',
      });
      imageUrl = uploadRes.secure_url;
    }
  const accessory = new Accessory({ ...req.body, image: imageUrl });
  await accessory.save();
  console.log('Accessory saved to MongoDB:', accessory);
  res.status(201).json(accessory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update accessory
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const accessory = await Accessory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(accessory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete accessory
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Accessory.findByIdAndDelete(req.params.id);
    res.json({ message: 'Accessory deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all brands
router.get('/brands', authMiddleware, async (req, res) => {
  try {
    const brands = await Accessory.distinct('brand');
    res.json(brands);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all colors
router.get('/colors', authMiddleware, async (req, res) => {
  try {
    const colors = await Accessory.distinct('color');
    res.json(colors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all types
router.get('/types', authMiddleware, async (req, res) => {
  try {
    const types = await Accessory.distinct('type');
    res.json(types);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const accessory = await Accessory.findById(req.params.id);
    if (!accessory) return res.status(404).json({ error: 'Accessory not found' });
    res.json(accessory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;

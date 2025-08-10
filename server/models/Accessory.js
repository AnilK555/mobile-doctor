import mongoose from 'mongoose';

const accessorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  type: { type: String, required: true }, // case, cover, earphone, etc.
  color: { type: String, required: true },
  count: { type: Number, required: true },
  details: { type: String, required: true },
  image: { type: String, required: true }, // Cloudinary URL
});

export default mongoose.model('Accessory', accessorySchema);

import mongoose from 'mongoose';

const AccessorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  type: { type: String, required: true },
  color: { type: String, required: true },
  count: { type: Number, required: true },
  details: { type: String, required: true },
  image: { type: String, required: true },
});

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const Accessory =
  mongoose.models.Accessory || mongoose.model('Accessory', AccessorySchema);
export const User =
  mongoose.models.User || mongoose.model('User', UserSchema);

import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'change_me_secret';

export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
}

export function verifyAuthHeader(request) {
  const auth = request.headers.get('authorization');
  if (!auth || !auth.startsWith('Bearer ')) return null;
  const token = auth.slice('Bearer '.length);
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

This is a [Next.js](https://nextjs.org) app with built-in API routes (no separate server needed).

## Getting Started (Local)

1. Copy env template and fill values:

```bash
cp .env.example .env
```

Required vars:

- MONGO_URI
- JWT_SECRET
- CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET

2. Install deps and run:

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

This repo is ready for single-click deploy to Vercel:

1. Import the Git repository into Vercel
2. In Project Settings → Environment Variables, add:
   - MONGO_URI
   - JWT_SECRET
   - CLOUDINARY_CLOUD_NAME
   - CLOUDINARY_API_KEY
   - CLOUDINARY_API_SECRET
3. Deploy

No separate Node server is required—API routes live under `src/app/api/**`.

## API Notes

- Auth:
  - POST `/api/auth/register` { username, password }
  - POST `/api/auth/login` { username, password } → { token }
  - Use `Authorization: Bearer <token>` for protected routes
- Accessories:
  - GET `/api/accessories?brand=...&type=...&color=...`
  - GET `/api/accessories?brandsList=1` → distinct brands
  - GET `/api/accessories?colorsList=1` → distinct colors
  - GET `/api/accessories?typesList=1` → distinct types
  - GET `/api/accessories/:id`
  - POST `/api/accessories` (auth required)
  - PUT `/api/accessories/:id` (auth required)
  - DELETE `/api/accessories/:id` (auth required)

Images: POST supports a base64 data URL; images over 1MB are rejected and Cloudinary is used to store them.

## Legacy `/server` folder

The `server/` directory (Express app) is no longer used. You can safely delete it. All functionality has been ported to Next.js route handlers.

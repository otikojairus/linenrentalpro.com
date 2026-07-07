# Linen Rental Pro

Next.js site for commercial laundry, linen rental, uniform rental, towel service, and floor mat rental pages.

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run start
```

## Docker

Build and run with Compose:

```bash
docker compose up --build
```

The container serves the app on `http://localhost:3000`.

Build the image directly:

```bash
docker build -t linenrentalpro:latest .
docker run --rm -p 3000:3000 linenrentalpro:latest
```

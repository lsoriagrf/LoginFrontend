# Login Frontend

Vue 3.5 login UI with traditional credentials and Google authentication (OAuth 2.0). The frontend sends the Google token to the backend for validation.

## Requirements

- Node.js 18+
- npm
- Backend running
- OAuth 2.0 project in [Google Cloud Console](https://console.cloud.google.com/)

## Installation

```bash
npm install
```

## Environment variables

Copy the example file and fill in the values:

```bash
cp .env.example .env
```

| Variable | Description |
|----------|-------------|
| `VITE_GOOGLE_CLIENT_ID` | **Web application** OAuth Client ID from Google Cloud |
| `VITE_API_BASE_URL` | Backend base URL (e.g. `http://localhost:8090`) |

Restart the dev server after changing `.env`.

## Google OAuth 2.0

1. Create a project (or use an existing one) in Google Cloud Console.
2. **APIs & Services → Credentials → Create credentials → OAuth client ID**.
3. Application type: **Web application**.
4. Under **Authorized JavaScript origins**, add the frontend URL (e.g. `http://localhost:8081`).
5. Copy the **Client ID** into `VITE_GOOGLE_CLIENT_ID` in `.env`.

## Development

```bash
npm run dev
```

The app runs at `http://localhost:8081`.

## Backend integration

| Method | Endpoint | Body |
|--------|----------|------|
| Username/password | `POST /api/v1/login` | `{ "usuario", "contrasenia" }` |
| Google | `POST /api/v1/login/google` | `{ "token": "<Google access_token>" }` |

The backend must validate the token received from the Google flow.

## Production

```bash
npm run build
npm run preview
```

Static files are output to `dist/`. Configure the same Client ID with your production domain in Google Cloud.

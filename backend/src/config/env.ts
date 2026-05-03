import dotenv from 'dotenv';
dotenv.config();

export const env = {
  port: Number(process.env.PORT ?? 3000),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  jwtSecret: process.env.JWT_SECRET ?? 'change-me',
  dbPath: process.env.DB_PATH ?? 'mango.db',
  smtpHost: process.env.SMTP_HOST ?? '',
  smtpPort: Number(process.env.SMTP_PORT ?? 587),
  smtpUser: process.env.SMTP_USER ?? '',
  smtpPass: process.env.SMTP_PASS ?? '',
  orderFromEmail: process.env.ORDER_FROM_EMAIL ?? 'no-reply@example.com',
  frontendUrl: process.env.FRONTEND_URL ?? 'http://localhost:5173',
};

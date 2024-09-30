import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  salt: process.env.BCRYPT_SALT_ROUNDS,
  jwt_access_secret_key: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret_key: process.env.JWT_REFRESH_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  STORE_ID: process.env.STORE_ID,
  SIGNATURE_KEY: process.env.SIGNATURE_KEY,
  PAYMENT_URL: process.env.PAYMENT_URL,
  NODE_ENV: process.env.NODE_ENV,
  PAYMENT_VERIFY_URL: process.env.PAYMENT_VERIFY_URL,
  ADMIN_NAME: process.env.ADMIN_NAME,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_ADDRESS: process.env.ADMIN_ADDRESS,
  ADMIN_PHONE: process.env.ADMIN_PHONE,
  ADMIN_ROLE: process.env.ADMIN_ROLE,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
};

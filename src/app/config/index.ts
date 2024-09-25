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
};

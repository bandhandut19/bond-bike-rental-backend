import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  salt: process.env.BCRYPT_SALT_ROUNDS,
  jwt_access_secret_key: process.env.JWT_ACCESS_SECRET,
  NODE_ENV: process.env.NODE_ENV,
};

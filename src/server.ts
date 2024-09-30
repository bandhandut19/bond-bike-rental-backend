import { Server } from 'http';
import app from './app';
import config from './app/config';
import mongoose from 'mongoose';
import { seedAdmin } from './app/utils/seedAdmin';
let server: Server;
async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    //initially an admin will be stored in the database
    seedAdmin();
    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
  process.on('unhandledRejection', () => {
    if (server) {
      server.close(() => {
        process.exit(1);
      });
    }
    process.exit(1);
  });

  process.on('uncaughtException', () => {
    process.exit(1);
  });
}
main();

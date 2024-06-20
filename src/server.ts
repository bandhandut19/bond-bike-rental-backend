import { Server } from 'http';
import app from './app';
import config from './app/config';
import mongoose from 'mongoose';
let server: Server;
async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }

  app.get('/', (req, res) => {
    res.send('Welcome to Bond Bike Rental');
  });
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

import dotenv from 'dotenv';
dotenv.config();

import app from './config/app';
import { makeSyncDatabase } from './factories/events';

app.listen(process.env.PORT, () => {
  makeSyncDatabase();
  console.info(`Server running on port ${process.env.PORT}`);
});

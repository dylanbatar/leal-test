import dotenv from 'dotenv';
dotenv.config();

import app from './config/app';

app.listen(process.env.PORT, () => {
  console.info(`Server running on port ${process.env.PORT}`);
});

import app from './config/app';
import { makeSyncDatabase } from './factories/events';

app.listen(3001, () => {
  // makeSyncDatabase();
  console.log('Server running on port 3000');
});

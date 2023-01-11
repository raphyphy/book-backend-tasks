import dotenv from 'dotenv';
import express from 'express';
import { logger } from './helper'

const result = dotenv.config();
if (result.error) {
  dotenv.config({ path: '.env.default' });
}

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    logger.info(`Express server started at http://localhost:${PORT}`)
})

export default app;
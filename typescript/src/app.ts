import 'reflect-metadata'; // Needed for Inversify

import express, {Request, Response, NextFunction} from 'express';
import bodyParser from 'body-parser';
import { logger } from './helper'
import { errorMiddleware } from './middleware';
import app from './server';
import routes from './routes';
import initDB from './database'
import swaggerUi from 'swagger-ui-express'
import * as swaggerDocument from './swagger.json'

// Application proper for books API. All configurations and routes for books should be modified here.
async function bootstrap() {
    if (process.env.NODE_ENV === 'development') {
        app.use((req: Request, _res: Response, next: NextFunction) => {
            logger.info(`[${req.method}] ${req.hostname}${req.url}`);
            next();
        });
    }
    app.use(express.json())
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    await initDB.connect();
    routes(app)

    if(process.env.NODE_ENV?.toLowerCase() !== 'prod') {
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    }

    app.use(errorMiddleware)
}

export default app;


bootstrap()
    .then(() => {
        logger.info('Server is now running...')
    })
    .catch(err => {
        logger.error('Unknown error: ' + err.message)
    })
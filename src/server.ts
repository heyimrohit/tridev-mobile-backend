import app from './app';
import config from './config/config';
import logger from './util/logger';
import databaseService from './service/databaseService';

const server = app.listen(config.PORT);

// eslint-disable-next-line @typescript-eslint/no-floating-promises
;(async () => {
    try {
        // Database Connection
        const connection = await databaseService.connect()
        logger.info(`DATABASE_CONNECTION`,{
            meta : {
                CONNECTION_NAME : connection.name
            }
        })

        logger.info(`APPLICATION_STARTED`,{
            meta : {
                PORT : config.PORT,
                SERVER_URL : config.SERVER_URL
            }
        })
    } catch (err) {
        logger.error(`APPLICATION_ERROR`, {meta : err})
        server.close((error) => {
            if (error) {
                logger.error(`APPLICATION_ERROR`, {meta : err})
            }
            process.exit(1)
        })
    }
})()
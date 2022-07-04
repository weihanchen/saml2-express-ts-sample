import * as bodyParser from 'body-parser';
import * as express from 'express';
import { port } from './config';
import * as logger from 'morgan';

(async () => {
    const app = express();
    app.use(logger('common'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(
        (
            err: any,
            req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ) => {
            console.error(err.stack || err);
            res.status(500).send(err.stack || err);
            next();
        }
    );
    app.listen(port, () => {
        console.info(`App is running at http://localhost:${port}`);
        console.info('Press CTRL-C to stop\n');
    });
})();
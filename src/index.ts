import * as bodyParser from 'body-parser';
import * as express from 'express';
import { port } from './config';
import * as logger from 'morgan';
import * as passport from 'passport';
import * as session from 'express-session';
import AuthRouter from './routes/auth.routes';

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
    app.use(
        session({
            resave: true,
            saveUninitialized: true,
            secret: "This is not a secret, friend."
        })
    );
    app.use(passport.initialize());
    app.use(passport.session());
    app.use('/auth', AuthRouter);
    app.listen(port, () => {
        console.info(`App is running at http://localhost:${port}`);
        console.info('Press CTRL-C to stop\n');
    });
})();
import * as passport from 'passport';
import { samlStrategy } from './saml.strategy';

export const init = () => {
    passport.use(samlStrategy);

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });
};

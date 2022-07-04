import * as passport from 'passport';
import * as passportSaml from 'passport-saml';
import { ssoEntryPoint, ssoIssuer, ssoCallbackUrl, ssoCert } from '../config';

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

// SAML strategy for passport -- Single IPD
const strategy = new passportSaml.Strategy(
    {
        entryPoint: ssoEntryPoint,
        issuer: ssoIssuer,
        callbackUrl: ssoCallbackUrl,
        cert: ssoCert,
    },
    (profile: any, done: any) => done(null, profile),
);

passport.use(strategy);

module.exports = passport;
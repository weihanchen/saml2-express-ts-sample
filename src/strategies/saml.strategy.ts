
import * as fs from 'fs';
import * as passportSaml from 'passport-saml';
import { ssoEntryPoint, ssoIssuer, ssoCallbackUrl, samlCertPath } from '../config';

const cert: string = fs.readFileSync(samlCertPath).toString();

// SAML strategy for passport -- Single IPD
export const samlStrategy = new passportSaml.Strategy(
    {
        entryPoint: ssoEntryPoint,
        issuer: ssoIssuer,
        callbackUrl: ssoCallbackUrl,
        cert,
    },
    (profile: any, done: any) => done(null, profile),
);
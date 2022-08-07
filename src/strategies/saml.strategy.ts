import * as fs from 'fs';
import * as passportSaml from 'passport-saml';
import { saml2IdpSso, saml2IDPEntityID, idpCertPath, spPemPath, saml2IdpSlo } from '../config';

const cert: string = fs.readFileSync(idpCertPath).toString();

const privateKey: string = fs.readFileSync(spPemPath).toString();

// SAML strategy for passport -- Single IPD
export const samlStrategy = new passportSaml.Strategy(
    {
        entryPoint: saml2IdpSso,
        callbackUrl: 'http://localhost:5002/auth/saml2/acs',
        logoutUrl: saml2IdpSlo,
        issuer: saml2IDPEntityID,
        cert,
        decryptionPvk: privateKey,
    },
    (profile: any, done: any) => done(null, profile)
);
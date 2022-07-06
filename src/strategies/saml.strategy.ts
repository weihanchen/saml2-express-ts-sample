import * as fs from 'fs';
import * as passportSaml from 'passport-saml';
import { saml2EntryPoint, saml2IDPEntityID, samlCertPath, privateKeyPath } from '../config';

const cert: string = fs.readFileSync(samlCertPath).toString();

const privateKey: string = fs.readFileSync(privateKeyPath).toString();

// SAML strategy for passport -- Single IPD
export const samlStrategy = new passportSaml.Strategy(
    {
        entryPoint: saml2EntryPoint,
        issuer: saml2IDPEntityID,
        cert,
        privateKey,
        decryptionPvk: privateKey
    },
    (profile: any, done: any) => done(null, profile)
);
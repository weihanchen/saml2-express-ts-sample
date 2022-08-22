import * as fs from 'fs';
import * as passportSaml from 'passport-saml';
import { saml2IdpSso, idpCertPath, spPemPath, saml2IdpSlo, spAddr } from '../config';

const cert: string = fs.readFileSync(idpCertPath).toString();

const privateKey: string = fs.readFileSync(spPemPath).toString();

// SAML strategy for passport -- Single IPD
export const samlStrategy = new passportSaml.Strategy(
    {
        entryPoint: saml2IdpSso,
        issuer: spAddr,
        callbackUrl: `${spAddr}/auth/saml2/acs`,
        logoutCallbackUrl: `${spAddr}/auth/saml2/sls`,
        logoutUrl: saml2IdpSlo,
        cert,
        privateKey,
        decryptionPvk: privateKey,
        signatureAlgorithm: 'sha256',
        digestAlgorithm: 'sha256',
        wantAssertionsSigned: false,
        identifierFormat: 'urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified',
        acceptedClockSkewMs: -1,
        validateInResponseTo: false,
        disableRequestedAuthnContext: true,
    },
    (profile: any, done: any) => done(null, profile)
);
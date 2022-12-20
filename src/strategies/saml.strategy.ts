import * as fs from 'fs';
import * as _ from 'lodash';
import { Profile, Strategy, VerifiedCallback, ValidateInResponseTo } from '@node-saml/passport-saml';
import { saml2IdpSso, idpCertPath, spPemPath, saml2IdpSlo, spAddr, saml2IdentifierFormat } from '../config';

const cert: string = fs.readFileSync(idpCertPath).toString();

const privateKey: string = fs.readFileSync(spPemPath).toString();

// SAML strategy for passport -- Single IPD
export const samlStrategy = new Strategy(
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
        identifierFormat: 'urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified',

        /**
         * lax verification policy...
         */
        audience: false,
        wantAssertionsSigned: false,
        wantAuthnResponseSigned: false,
        acceptedClockSkewMs: -1,
        validateInResponseTo: ValidateInResponseTo.never,
        disableRequestedAuthnContext: true,
    },
    (profile: Profile, done: VerifiedCallback) => {
        profile = _.defaults(profile, { nameIDFormat: saml2IdentifierFormat });
        done(null, profile, profile);
        return profile;
    },
    (profile: Profile, done: VerifiedCallback) => {
        profile = _.defaults(profile, { nameIDFormat: saml2IdentifierFormat });
        done(null, profile, profile);
        return profile;
    }
);

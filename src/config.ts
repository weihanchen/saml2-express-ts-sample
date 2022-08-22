import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({ path: '.env' });

export const port: number = +process.env.PORT;

export const saml2IdpSso: string = process.env.SAML2_IDP_SSO;

export const saml2IdpSlo: string = process.env.SAML2_IDP_SLO;

export const saml2IDPEntityID: string = process.env.SAML2_IDP_ENTITY_ID;

export const spAddr: string = process.env.SP_ADDR;

const configDirPath = 'initial';

export const idpCertPath = join(configDirPath, 'idp.cert');

export const spPemPath = join(configDirPath, 'sp.pem');

export const spCertPath = join(configDirPath, 'sp.crt');

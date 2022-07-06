import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({ path: '.env' });

export const port: number = +process.env.PORT;

export const saml2EntryPoint: string = process.env.SAML2_ENTRYPOINT;

export const saml2IDPEntityID: string = process.env.SAML2_IDP_ENTITY_ID;

const configDirPath = 'initial';

export const samlCertPath = join(configDirPath, 'saml.cert');

export const privateKeyPath = join(configDirPath, 'sp.pem');

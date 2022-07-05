import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({ path: '.env' });

export const port: number = +process.env.PORT;

export const ssoEntryPoint: string = process.env.SSO_ENTRYPOINT;

export const ssoIssuer: string = process.env.SSO_ISSUER;

export const ssoCallbackUrl: string = process.env.SSO_CALLBACK_URL;

const configDirPath = 'initial';

export const samlCertPath = join(configDirPath, 'saml.cert');

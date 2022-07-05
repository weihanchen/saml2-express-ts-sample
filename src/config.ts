import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({ path: '.env' });

export const port: number = +process.env.PORT;

export const ssoEntryPoint: string = process.env.SSO_ENTRYPOINT;

const configDirPath = 'initial';

export const samlCertPath = join(configDirPath, 'saml.cert');

export const privateKeyPath = join(configDirPath, 'sp.pem');

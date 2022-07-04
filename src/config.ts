import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export const port: number = +process.env.PORT;

export const ssoEntryPoint: string = process.env.SSO_ENTRYPOINT;

export const ssoIssuer: string = process.env.SSO_ISSUER;

export const ssoCallbackUrl: string = process.env.SSO_CALLBACK_URL;

export const ssoCert: string = process.env.SSO_CERT;
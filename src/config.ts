import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export const port: number = +process.env.PORT;
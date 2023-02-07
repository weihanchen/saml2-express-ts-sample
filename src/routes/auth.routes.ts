import { Router, Request, Response } from 'express';
import { AuthController } from '../controllers/auth.controller';
import * as passport from 'passport';
import * as fs from 'fs';
import * as https from 'https';
import * as _ from 'lodash';
import { fetch, toPassportConfig } from 'passport-saml-metadata';
import { samlStrategy } from '../strategies/saml.strategy';
import { spCertPath } from '../config';
import { RequestWithUser } from '@node-saml/passport-saml/lib/types';
import { Profile } from '@node-saml/node-saml/lib';

const router: Router = Router();

router.route('/logout').post((req: Request, res: Response) => {
    console.log(req.body);
    res.send('ok');
});

/**
 * This Route Authenticates req with IDP
 * If Session is active it returns saml response
 * If Session is not active it redirects to IDP's login form
 */
router.route('/saml2').get(
    passport.authenticate('saml', {
        successRedirect: '/',
        failureRedirect: '/login',
    })
);

/**
 * Assertion Consumer Service endpoint (POST)
 */
router
    .route('/saml2/acs')
    .post(
        passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }),
        (_: Request, response: Response) => {
            console.log('success');
            response.redirect('/auth/saml2/info');
        }
    );
/**
 *  Service Provider's metadata endpoint
 */
router.route('/saml2/metadata').get((req: Request, res: Response) => {
    const cert: string = fs.readFileSync(spCertPath, 'utf-8');
    console.info(cert);
    res.type('application/xml');
    res.send(samlStrategy.generateServiceProviderMetadata(cert, cert));
});

interface IDPMetadataReqBody {
    url: string;
}

/**
 * Update Idp by metadata
 */
router.route('/saml2/idp-metadata').put(async (req: Request, res: Response) => {
    const { url }: IDPMetadataReqBody = req.body;

    const httpsAgent = new https.Agent({
        rejectUnauthorized: false,
    });

    const reader = await fetch({ url, httpsAgent });

    const config = toPassportConfig(reader);

    samlStrategy._saml.options = { ...samlStrategy._saml.options, ...config };

    console.debug(samlStrategy._saml.options);

    res.send('ok');
});

/**
 * Single Logout Service endpoint
 */
router.route('/saml2/sls').get(async (req: RequestWithUser, res: Response) => {
    try {
        const profile = req.user as Profile;

        if (_.isNil(profile)) {
            throw new Error("saml's profile");
        }

        console.debug('============================== profile ============================================');
        console.debug(profile);

        const url: string = await getSaml2SLSUrl(req);

        res.redirect(url);
    } catch (error) {
        console.error(error);
        throw error;
    }
});

const getSaml2SLSUrl = async (req: RequestWithUser): Promise<string> => {
    return new Promise((resolve, reject) => {
        samlStrategy.logout(req, (err, _uri: string) => {
            if (err) {
                return reject(err);
            }
            resolve(_uri);
        });
    });
};

router.route('/saml2/info').get(AuthController.info);

export default router;

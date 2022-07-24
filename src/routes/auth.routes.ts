import { Router, Request, Response } from 'express';
import { AuthController } from '../controllers/auth.controller';
import * as passport from 'passport';
import * as fs from 'fs';
import { samlStrategy } from '../strategies/saml.strategy';
import { spCertPath } from '../config';
import { RequestWithUser } from 'passport-saml/lib/passport-saml/types';

const router: Router = Router();

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
 *  Metadata endpoint
 */
router.route('/saml2/metadata').get((req: Request, res: Response) => {
    const cert: string = fs.readFileSync(spCertPath, 'utf-8');
    console.info(cert);
    res.type('application/xml');
    res.send(samlStrategy.generateServiceProviderMetadata(cert));
});

/**
 * Single Logout Service endpoint
 */
router.route('/saml2/sls').get((req: RequestWithUser, res: Response) => {
    samlStrategy.logout(req, (err, url) => {
        console.debug(err);
        console.debug(url)
        if (!err) {
            res.redirect(url);
        }
    });
});

router.route('/saml2/info').get(AuthController.info);

export default router;

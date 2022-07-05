import { Router, Request, Response } from 'express';
import { AuthController } from '../controllers/auth.controller';
import * as passport from 'passport';

const router: Router = Router();

/**
 * This Route Authenticates req with IDP
 * If Session is active it returns saml response
 * If Session is not active it redirects to IDP's login form
 */
router.route('/sso').get(
    passport.authenticate('saml', {
        successRedirect: '/',
        failureRedirect: '/login',
    })
);

/**
 * This is the callback URL
 * Once Identity Provider validated the Credentials it will be called with base64 SAML req body
 * Here we used Saml2js to extract user Information from SAML assertion attributes
 * If every thing validated we validates if user email present into user DB.
 * Then creates a session for the user set in cookies and do a redirect to Application
 */
router
    .route('/sso/callback')
    .post(
        passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }),
        (_: Request, response: Response) => {
            console.log('success');
            response.redirect('/');
        }
    );

router.route('/sso/info').get(AuthController.info);

export default router;

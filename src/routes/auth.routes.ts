import { Router, Request, Response } from 'express';
import { AuthController } from '../controllers/auth.controller';
import * as passport from 'passport';

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

router.route('/saml2/info').get(AuthController.info);

export default router;

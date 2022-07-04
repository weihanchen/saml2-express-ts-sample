
import { Router, Request, Response, NextFunction } from 'express';
import { AuthController } from '../controllers/auth.controller';
import * as passport from 'passport';

const router: Router = Router();



router.route('/saml-assertion').post(
    passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }),
    (_: Request, response: Response) => {
        console.log('success');
});

export default router;
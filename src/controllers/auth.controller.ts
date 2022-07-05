import { Response } from "express";

export class AuthController {
    constructor() {
    }
    
    static info(request: any, response: Response) {
        if (!request.user) {
            response.status(401).json({
                message: 'NOT authenticated',
            });
        }
        console.log(request.user);
        response.status(200).json({
            nameID: request.user.nameID,
        });
    }
}


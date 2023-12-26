import { Request, Response, NextFunction } from 'express';

const middleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        if (err.message == 'missing user credentials') {
            return res.status(400).json({
                statusCode: 400,
                errorMessage: err.message
            });
        } else if (err.message == 'invalid user credentials') {
            return res.status(401).json({
                statusCode: 401,
                errorMessage: err.message
            });
        } else if (err.message == 'e-mail already is been used') {
            return res.status(409).json({
                statusCode: 409,
                errorMessage: err.message
            })
        }
    }
    
    return next();
}

export { middleware };
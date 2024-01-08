import { Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

const verifyAccessToken = async (token: string) => {
    const secret = process.env.JWT_SECRET ? process.env.JWT_SECRET : '';

    try {

        const decoded = verify(token, secret);
        return { success: true, data: decoded };

    } catch (error) {

        return { success: false, data: 'Invalid JSON Web Token' };

    }
}


const isAuthenticated = async (req: any, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader?.includes('Bearer')) {

        const authorizationToken = authHeader.split(' ')[0];
        const result = await verifyAccessToken(authorizationToken);
        req.userCredentials = result;

    } else {

        const result = { success: false, data: "It doesn't have an authorization token" };
        req.userCredentials = result;

    }

    next();
}

export { isAuthenticated };
import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

interface userCredentials extends Request {
    userCredentials: {
        success: Boolean,
        data: string | JwtPayload
    }
}

export { userCredentials }
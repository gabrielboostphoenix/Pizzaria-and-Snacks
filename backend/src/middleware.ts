import { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

const middleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return res.status(400).json({
            statusCode: 400,
            errorMessage: err.message
        })
    }

    return res.status(500).json({
        statusCode: 500,
        errorMessage: "Internal Server Error"
    })
}

export { middleware };
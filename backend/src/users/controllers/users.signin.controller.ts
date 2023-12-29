import { Request, Response } from "express";
import { findSpecifUserID } from "../services/users.auth.service";
import { payload } from '../dto/signin';
import { sign } from 'jsonwebtoken';

class userSignInController {

    async generateAccessToken(data: payload) {
        const payload = {
            id: data.userID,
            email: data.userEmail
        }
        const secret = process.env.JWT_SECRET ? process.env.JWT_SECRET : '';
        const options = { expiresIn: '30d' };

        return sign(payload, secret, options);
    }

    async handle(req: Request, res: Response) {
        const { userEmail, userPassword } = req.body;

        if (!userEmail || !userPassword) {
            const error = new Error('missing user credentials!');
            return res.status(400).json({
                statusCode: 400,
                errorMessage: error.message
            });
        }

        const checkIfThereIsAlreadyUser = await findSpecifUserID(req.body);

        if (checkIfThereIsAlreadyUser.length == 0) {
            const error = new Error('invalid user credentials!');
            return res.status(401).json({
                statusCode: 401,
                errorMessage: error.message
            });
        }

        return res.status(200).json({
            message: "You've entered in route with successfully!"
        });
    }
}

export { userSignInController };
import { Response } from 'express';
import { findSpecifUserID } from '../services/users.auth.service';
import { payload } from '../dto/sign.in';
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

    async handle(req: any, res: Response) {
        if (req.userCredentials.success === true) {

            return res.send('You have the token to login, Congratulations!');

        } else {
            const { userEmail, userPassword } = req.body;

            if (userEmail === undefined || userPassword === undefined) {
                const error = new Error('missing user credentials!');
                return res.status(400).json({
                    statusCode: 400,
                    errorMessage: error.message
                });
            }

            const checkIfThereIsAlreadyUser = await findSpecifUserID(req.body);

            if (checkIfThereIsAlreadyUser?.id === null) {
                const error = new Error('invalid user credentials!');
                return res.status(401).json({
                    statusCode: 401,
                    errorMessage: error.message
                });
            }

            const payload = {
                userID: checkIfThereIsAlreadyUser?.id,
                userEmail: userEmail
            }

            const generatedTokenResult = await this.generateAccessToken(payload)

            return res.status(200).json({
                message: "You've entered in route with successfully!",
                jwtAccess: generatedTokenResult
            });
        }
    }
}

export { userSignInController };
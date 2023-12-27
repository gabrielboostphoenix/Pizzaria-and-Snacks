import { Request, Response } from 'express';
import { addUser, checkIfEmailIsBeenUsed } from "../services/users.signup.service";

class userSignUpController {

    async handle(req: Request, res: Response) {
        const { userName, userEmail, userPassword } = req.body;

        if (!userName || !userEmail || !userPassword) {
            const error = new Error('missing user credentials!');
            return res.status(400).json({
                statusCode: 400,
                errorMessage: error.message
            });
        }

        const checkIfEmailAlreadyIsBeenUsed = await checkIfEmailIsBeenUsed(userEmail);

        if (checkIfEmailAlreadyIsBeenUsed) {
            const error = new Error('e-mail already is been used!');
            return res.status(409).json({
                statusCode: 409,
                errorMessage: error.message
            });
        }

        const result = await addUser({
            userName: userName,
            userEmail: userEmail,
            userPassword: userPassword
        });

        return res.status(201).json({
            message: 'User created successfully!',
            result: result
        });
    }
}

export { userSignUpController };
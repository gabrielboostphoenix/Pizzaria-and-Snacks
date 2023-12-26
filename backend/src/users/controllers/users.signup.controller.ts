import { Request, Response } from 'express';
import { addUser, checkIfEmailIsBeenUsed } from "../services/users.signup.service";

class userSignUpController {

    async handle(req: Request, res: Response) {
        const { userName, userEmail, userPassword } = req.body;

        if (!userName || !userEmail || !userPassword) {
            throw new Error('missing user credentials');
        }

        const checkIfEmailAlreadyIsBeenUsed = await checkIfEmailIsBeenUsed(req.body);

        if (checkIfEmailAlreadyIsBeenUsed) {
            throw new Error('e-mail already is been used');
        }

        const result = addUser({
            userName: userName,
            userEmail: userEmail,
            userPassword: userPassword
        });

        return res.status(201).send({
            'user created suceesfully': result
        });
    }
}

export { userSignUpController };
// Importing area
import { Request, Response } from 'express';
import { addUser, checkIfEmailIsBeenUsed } from '../services/users.signup.service';

// Class statement
class userSignUpController {

    // SignUp handle functionality
    async handle(req: Request, res: Response) {
        // Request extraction
        const { userName, userEmail, userPassword } = req.body;

        // Checking for missing credentials
        if (!userName || !userEmail || !userPassword) {
            const error = new Error('missing user credentials!');
            return res.status(400).json({
                statusCode: 400,
                errorMessage: error.message
            });
        }

        const checkIfEmailAlreadyIsBeenUsed = await checkIfEmailIsBeenUsed(userEmail);

        // Checking if email is been used for another user
        if (checkIfEmailAlreadyIsBeenUsed) {
            const error = new Error('e-mail already is been used!');
            return res.status(409).json({
                statusCode: 409,
                errorMessage: error.message
            });
        }

        const operationResult = await addUser({
            userName: userName,
            userEmail: userEmail,
            userPassword: userPassword
        });

        // Returning user creation message
        return res.status(201).json({
            message: 'User created successfully!',
            result: operationResult
        });
    }
}

// Exporting area
export { userSignUpController };
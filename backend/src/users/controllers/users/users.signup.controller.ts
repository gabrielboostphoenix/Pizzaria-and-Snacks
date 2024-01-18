// Importing Area
import { Request, Response } from 'express';
import { hash } from 'bcryptjs';
import { addUser, checkIfEmailIsBeenUsed } from '../../services/users/users.signup.service';

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

        // Checking if email is been used for another user
        const checkIfEmailAlreadyIsBeenUsed = await checkIfEmailIsBeenUsed(userEmail);

        if (checkIfEmailAlreadyIsBeenUsed) {
            const error = new Error('e-mail already is been used!');
            return res.status(409).json({
                statusCode: 409,
                errorMessage: error.message
            });
        }

        // Hashing the user password
        const hashedPassword = await hash(userPassword, 8);

        // Registering an user in database
        const operationResult = await addUser({
            userName: userName,
            userEmail: userEmail,
            userPassword: hashedPassword
        });

        // Returning user creation message
        return res.status(201).json({
            message: 'User created successfully!',
            result: operationResult
        });
    }
}

// Exporting Area
export { userSignUpController };
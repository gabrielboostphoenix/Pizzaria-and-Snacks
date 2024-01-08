// Importing area
import { Response } from 'express';
import { findSpecifUser } from '../services/users.auth.service';
import { payload } from '../dto/sign.in';
import { sign } from 'jsonwebtoken';

// This functionality checks for a valid access token
const generateAccessToken = async (data: payload) => {
    // Extracting user informations to use in token
    const payload = {
        id: data.userID,
        email: data.userEmail
    }
    // Getting the API JWT secret
    const secret = process.env.JWT_SECRET ? process.env.JWT_SECRET : '';
    // Setting the token expire time
    const options = { expiresIn: '30d' };

    // Registering the token
    return sign(payload, secret, options);
}

class userSignInController {

    // This functionality handles user login request
    async handle(req: any, res: Response) {
        // Checking for avaliable user credentials in the login request
        if (req.userCredentials.success === true) {

            return res.send('You have the token to login, so congratulations!');

        } else {

            // This case doesn't have the user credentials
            // Extracting the user credentials from request
            const { userEmail, userPassword } = req.body;

            // Checking for missing user credentials
            if (userEmail === undefined || userPassword === undefined) {
                const error = new Error('missing user credentials!');
                return res.status(400).json({
                    statusCode: 400,
                    errorMessage: error.message
                });
            }

            // Checking if there's an user registed in database with these credentials
            const checkIfThereIsAlreadyUser = await findSpecifUser(req.body);

            if (checkIfThereIsAlreadyUser instanceof Error) {

                return res.status(401).json({
                    statusCode: 401,
                    errorMessage: checkIfThereIsAlreadyUser.message
                });

            } else {

                // Creating the paylod to use it in token
                const payload = {
                    userID: checkIfThereIsAlreadyUser.id,
                    userName: checkIfThereIsAlreadyUser,
                    userEmail: userEmail
                }

                // Generating the user access token
                const generatedTokenResult = await generateAccessToken(payload);

                // Returning the success message
                return res.status(200).json({
                    message: "You've entered in route with successfully!",
                    jwtAccess: generatedTokenResult
                });

            }

        }
    }
}

// Exporting area
export { userSignInController };
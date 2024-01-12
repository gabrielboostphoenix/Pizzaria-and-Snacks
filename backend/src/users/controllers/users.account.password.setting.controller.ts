// Importing Area
import { Response } from 'express';
import { hash } from 'bcryptjs';
import { changePassword, findSpecifUserByID } from '../services/users.handle.service';

class userAccountPasswordSettingsController {

    // This functionality handles user account settings request
    async handle(req: any, res: Response) {
        // Checking for jwt authentication in request
        if (req.userCredentials.success === true) {

            // Extracting the user informations from request
            const { userPassword } = req.body;
            const userID = req.userCredentials.data.id;

            // Checking if exists user information like the password
            if (userPassword !== undefined && userPassword !== "") {
                // Hashing the user password
                const hashedPassword = await hash(userPassword, 8);

                // Changing the user password
                await changePassword(userID, hashedPassword);

                // Storing the result of user informations new changes
                const result = await findSpecifUserByID(userID);

                // Returning the operation result to the client
                return res.status(200).json({
                    statusCode: 200,
                    message: "Changed user information with successfully!",
                    user: result
                });

            }

            // Checking for no user information has been sent through request
            if (userPassword === undefined || userPassword === "") {
                return res.status(400).json({
                    statusCode: 400,
                    message: "missing user informations"
                });
            }

        } else {

            // This case doesn't have the jwt in user request
            return res.status(401).json({
                statusCode: 401,
                message: "Access denied due to absence of json web token"
            });

        }
    }
}

export { userAccountPasswordSettingsController };
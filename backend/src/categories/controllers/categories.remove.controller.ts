// Importing Area
import { Response } from 'express';
import { removeCategory } from '../services/categories.remove.service';

class categoryRemoveController {

    // This functionality handles the category removing route
    async handle(req: any, res: Response) {

        // Checking for avaliable user credentials in the category removing request
        if (req.userCredentials.success === true) {

            // In this case is possible to use the service because it has the jwt
            // Using the service to remove the category register in database
            const result = await removeCategory(req.body);

            // Checking the data type of database operation result to return a specific response
            if (typeof result === 'object') {

                // Returning the success message
                return res.status(200).json({
                    statusCode: 200,
                    successMessage: "Category removed with successfully"
                });

            } else {

                // Returning an error message
                return res.status(404).json({
                    statusCode: 404,
                    errorMessage: "Category register not found in database"
                });

            }

        } else {

            // In this wasn't possible to use the service because doesn't have the jwt
            return res.status(401).json({
                statusCode: 401,
                errorMessage: "Unauthorized Category Removing Service"
            });

        }
    }
};

// Exporting Area
export { categoryRemoveController };